/**
 * A quaint logging module with timestamps and aesthetic logging level
 *
 * You may modify the constants in /modules/constants/logging.js to change the styling or timestamp format
 *
 * This module doesn't support:
 * - Control over the logging level
 * - Logging to file, though you may pipe your console output to a file
 * - The value substitution feature of console.log
 *
 * To change the logging module used throughout this project, modify /modules/log.js
 * @module loggers/wrapper
 */

const { DateTime } = require("luxon");
const { timestampStyle, timestampFormat, styles } = require("../constants/logging");

/**
 * @private
 * @param {string} format
 * @returns {string}
 */
const timestamp = (format) => timestampStyle ? timestampStyle(DateTime.now().toFormat(format)) : DateTime.now().toFormat(format);

/**
 * @private
 * @param {string} level
 * @param  {...any} args
 * @returns {void}
 */
const log = function(level, ...args) {
    const prefix = timestamp(timestampFormat) + " " + styles[level](level);
    return level === "error" || level === "fatal" ? console.error(prefix, ...args) : console.log(prefix, ...args);
};

module.exports.fatal = log.bind(null, "fatal");
module.exports.error = log.bind(null, "error");
module.exports.warn = log.bind(null, "warn");
module.exports.info = log.bind(null, "info");
module.exports.debug = log.bind(null, "debug");
module.exports.trace = log.bind(null, "trace");
