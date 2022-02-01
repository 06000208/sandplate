/**
 * If desired you may modify this file to control constants (eg. fallback timestamp format, terminal styling, etc) used by the default logging modules
 * @module constants/logging
 */

const chalk = require("chalk");

/**
 * Chalk function used for the timestamp, otherwise null for no styling
 * @type {?import("chalk").Chalk}
 */
module.exports.timestampStyle = null;

/**
 * Timestamp format string used as a fallback for process.env.LOGGING_TIMESTAMP
 *
 * Used with [DateTime#toFormat](https://moment.github.io/luxon/api-docs/index.html#datetimetoformat), so you may use [luxon's formatting tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens) and escape characters by encasing them inside brackets
 * @type {string}
 */
module.exports.timestampFormat = "HH:mm:ss.SSS";

/**
 * Chalk functions used for logging level labels
 * @type {Object.<string, import("chalk").Chalk>}
 */
module.exports.styles = {
    "fatal": chalk.bgRed.black,
    "error": chalk.red,
    "warn": chalk.yellow,
    "info": chalk.white.bold,
    "debug": chalk.green,
    "trace": chalk.gray,
};

/**
 * Logging levels
 *
 * Don't modify this haphazardly
 * @private
 * @readonly
 * @type {Object.<string, number>}
 */
module.exports.levels = {
    "fatal": 0,
    "error": 1,
    "warn": 2,
    "info": 3,
    "debug": 4,
    "trace": 5,
};

