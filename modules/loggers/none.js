/**
 * Used to avoid/disable all logger features by aliasing the expected functions directly to console.log and console.error
 *
 * 100% compatibility with console functions
 *
 * To change the logging module used throughout this project, modify /modules/log.js
 * @module loggers/none
 */

module.exports.trace = console.log;
module.exports.debug = console.log;
module.exports.info = console.log;
module.exports.warn = console.log;
module.exports.error = console.error;
module.exports.fatal = console.error;
