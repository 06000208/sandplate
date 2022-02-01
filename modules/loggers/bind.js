/**
 * A logging module that provides direct access to the console.log() and console.error() functions with an aesthetic logging level
 *
 * This is to provide compatibility with debuggers such as the one built into vscode
 *
 * You may modify the constants in /modules/constants/logging.js to change the styling
 *
 * This module doesn't support:
 * - Timestamps
 * - Control over the logging level
 * - Logging to file, though you may pipe your console output to a file
 * - The value substitution feature of console.log
 *
 * To change the logging module used throughout this project, modify /modules/log.js
 * @module loggers/bind
 */

const { styles } = require("../constants/logging");

/**
 * @private
 * @param {number} id
 * @returns {string}
 */
const prefix = (label) => styles[label](label);

module.exports.fatal = console.error.bind(console, prefix("fatal"));
module.exports.error = console.error.bind(console, prefix("error"));
module.exports.warn = console.log.bind(console, prefix("warn"));
module.exports.info = console.log.bind(console, prefix("info"));
module.exports.debug = console.log.bind(console, prefix("debug"));
module.exports.trace = console.log.bind(console, prefix("trace"));
