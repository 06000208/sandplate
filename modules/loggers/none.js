/**
 * Used to avoid/disable all special logging features by making the expected functions the same as console.log and console.error
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
