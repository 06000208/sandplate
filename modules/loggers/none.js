/**
 * Used to avoid/disable all special logging features by making the expected functions the same as console.log and console.error
 *
 * To change the logging module used throughout this project, modify /modules/log.js
 * @module loggers/none
 */

const log = {
    fatal: console.error,
    error: console.error,
    warn: console.log,
    info: console.log,
    debug: console.log,
    trace: console.log,
};

export { log };
