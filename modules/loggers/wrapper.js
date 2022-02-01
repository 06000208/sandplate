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

import { DateTime } from "luxon";
import { timestampStyle, timestampFormat, styles } from "../constants/logging.js";

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
const print = function(level, ...args) {
    const prefix = timestamp(timestampFormat) + " " + styles[level](level);
    return level === "error" || level === "fatal" ? console.error(prefix, ...args) : console.log(prefix, ...args);
};

const log = {
    fatal: print.bind(null, "fatal"),
    error: print.bind(null, "error"),
    warn: print.bind(null, "warn"),
    info: print.bind(null, "info"),
    debug: print.bind(null, "debug"),
    trace: print.bind(null, "trace"),
};

export { log };
