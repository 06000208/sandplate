/**
 * This module contains a bunch of exported functions. Some are useful in general, others are for convenience and code clarity, as its sometimes simpler for logic to be a reusable function rather than writing code multiple times where needed to achieve the same result
 * @module miscellaneous
 */

const { promisify } = require("util");
const { codeBlock } = require("discord.js");

/**
 * Lets you "pause" for X amount of time, in milliseconds. (This is setTimeout's promise based custom variant)
 *
 * {@link https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args Documentation} & {@link https://github.com/nodejs/node/blob/master/lib/timers.js#L150 Source Code}
 *
 * @param {number} milliseconds
 * @example await wait(4000); // Pauses for 4 seconds
 */
module.exports.wait = promisify(setTimeout);

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
 * Logic for easier appending to arrays stored in collections
 * @todo Remove this
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
 * @todo Remove this
 * @param {Collection} collection
 * @param {*} key
 * @param {...*} values
 */
module.exports.collectionArrayFilter = function(collection, key, ...values) {
    if (!values.length) return;
    if (collection.has(key)) {
        const data = collection.get(key);
        if (!Array.isArray(data)) return;
        if (data.length === 1 && values.includes(data[0])) {
            collection.delete(key);
        } else {
            collection.set(key, data.filter(element => !values.includes(element)));
        }
    }
};

/**
 * Returns a string of the same length containing only asterisks
 * @param {string} value
 * @returns {string}
 */
module.exports.obscureString = (value) => "*".repeat(value.length);

/**
 * Obscures a discord token, inspired by [this snippet](https://github.com/discordjs/discord.js/blob/5ec04e077bbbb9799f3ef135cade84b77346ef20/src/client/Client.js#L232-L235) in discord.js' source code
 * @param {string} token
 * @returns {string}
 */
module.exports.obscureDiscordToken = (token) => token
    .split(".")
    .map((value, index) => (index > 0 ? module.exports.obscureString(value) : value))
    .join(".");
