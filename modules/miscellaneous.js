/**
 * This module contains a bunch of exported functions. Some are useful in general, others are for convenience and code clarity, as its sometimes simpler for logic to be a reusable function rather than writing code multiple times where needed to achieve the same result
 * @module miscellaneous
 */

const { promisify } = require("util");
const { isArray, isString, isFinite } = require("lodash");
const { Permissions, Formatters: { codeBlock }, BitField } = require("discord.js");

/**
 * Lets you "pause" for X amount of time, in milliseconds. (This is setTimeout's promise based custom variant)
 *
 * {@link https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args Documentation} & {@link https://github.com/nodejs/node/blob/master/lib/timers.js#L150 Source Code}
 *
 * @param {number} milliseconds
 * @example await sleep(4000); // Pauses for 4 seconds
 */
module.exports.sleep = promisify(setTimeout);

/**
 * Just a small shortcut to JSON.stringify with optional discord code block wrapping on the returned string
 * @param {Object} object
 * @param {number} [whitespace=2]
 * @param {boolean} [useCodeBlock=false]
 * @example
 * const car = {type:"Fiat", model:"500", color:"white"};
 * lovely(car); // returned string isn't wrapped, whitespace defaults to 2
 * lovely(car, 4, true); // returns string wrapped in discord codeBlock, uses 4 spaces of whitespace
 */
module.exports.lovely = function(object, whitespace = 2, useCodeBlock = false) {
    const formatted = JSON.stringify(object, null, whitespace);
    return useCodeBlock ? codeBlock("json", formatted) : formatted;
};

/**
 * Checks if a value is a array that only contains strings, and by default, a non-empty array
 * @param {*} value
 * @param {boolean} [checkLength=true] Whether the array's length is checked
 * @returns {boolean} Returns `true` if value is an array that only contains strings, else `false`
 */
module.exports.isArrayOfStrings = function(value, checkLength = true) {
    if (!isArray(value)) return false;
    if (checkLength) {
        if (!value.length) return false;
    } else if (!value.length) {
        return true;
    }
    return !value.some(element => !isString(element));
};

/**
 * Checks if a value is resolvable to a permission number
 * @see https://discord.js.org/#/docs/main/stable/typedef/PermissionResolvable
 * @param {*} value
 * @returns {boolean} Returns `true` if value is a PermissionResolvable, else `false`
 */
module.exports.isPermissionResolvable = function(value) {
    if (isArray(value)) {
        return value.every(module.exports.isPermissionResolvable);
    } else if (isString(value) || typeof value === "bigint" || value instanceof Permissions) {
        return true;
    } else {
        return false;
    }
};

/**
 * Logic for easier appending to arrays stored in collections
 * @param {Collection} collection
 * @param {*} key
 * @param {...*} values
 */
module.exports.collectionArrayPush = function(collection, key, ...values) {
    if (collection.has(key)) {
        collection.set(key, collection.get(key).concat([...values]));
    } else {
        collection.set(key, [...values]);
    }
};

/**
 * Logic for easier removal of elements from arrays stored in collections
 * @param {Collection} collection
 * @param {*} key
 * @param {...*} values
 */
module.exports.collectionArrayFilter = function(collection, key, ...values) {
    if (!values.length) return;
    if (collection.has(key)) {
        const data = collection.get(key);
        if (!isArray(data)) return;
        if (data.length === 1 && values.includes(data[0])) {
            collection.delete(key);
        } else {
            collection.set(key, data.filter(element => !values.includes(element)));
        }
    }
};

/**
 * Logic for handling both one or multiple of something with the same callback function.
 *
 * For example, some data options for modules can be a string, or an array with any number of strings.
 *
 * This takes a callback function and invokes it with value as the first parameter.
 *
 * However, if value is an array, the callback is invoked for each element as the first parameter instead.
 *
 * All parameters beyond value are passed into the callback.
 *
 * @param {function} callback
 * @param {*} value
 * @param {...*} args
 */
module.exports.forAny = function(callback, value, ...params) {
    if (isArray(value)) {
        for (const element of value) {
            callback(element, ...params);
        }
    } else {
        callback(value, ...params);
    }
};
