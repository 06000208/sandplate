/**
 * A quaint logging module with timestamps and logging level
 *
 * You may modify the constants in /modules/constants/logging.js to change the styling or timestamp format
 *
 * This method unfortunately doesn't support:
 * - Logging to file, though you may pipe your console output to a file
 * - The value substitution feature of console.log
 *
 * To change the logging module used throughout this project, modify /modules/log.js
 * @module loggers/wrapper
 */

const process = require("process");
const { DateTime } = require("luxon");
const { timestampStyle, timestampFormat, styles, levels } = require("../constants/logging");

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
    if (process.env.LOGGING_LEVEL && levels[process.env.LOGGING_LEVEL] && levels[level] > levels[process.env.LOGGING_LEVEL]) return;
    const prefix = timestamp(process.env.LOGGING_TIMESTAMP ? process.env.LOGGING_TIMESTAMP : timestampFormat) + " " + styles[level](level);
    return level === "error" || level === "fatal" ? console.error(prefix, ...args) : console.log(prefix, ...args);
};

module.exports.fatal = log.bind(null, "fatal");
module.exports.error = log.bind(null, "error");
module.exports.warn = log.bind(null, "warn");
module.exports.info = log.bind(null, "info");
module.exports.debug = log.bind(null, "debug");
module.exports.trace = log.bind(null, "trace");
