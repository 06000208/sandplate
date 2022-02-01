/**
 * This module is used to pipe logging to your logging module of choice, swapped below via comment
 *
 * This is provided as a compromise that's better than alternatives, and to provide the most freedom with the least amount of code change or impact on git
 *
 * Using this module is not mandatory, and any of the provided loggers work on their own when used directly
 *
 * Loggers used with this module are expected to provide the following functions:
 *
 * log.trace(), log.debug(), log.info(), log.warn(), log.error(), log.fatal()
 * @module log
 * @example
 * log.trace(new Date);
 * log.debug("Is water wet?", true);
 * log.info("hello", "world,", "how", "are", "you?");
 * log.warn("Teapots may only pour tea");
 * log.error(new Error("I am Error"));
 * log.fatal(new Error("418 I'm a teapot"));
 */

// directly uses console.log and console.error, compatibility with debuggers
// module.exports = require("./loggers/none");

// purely aesthetic logging level, compatibility with debuggers
// module.exports = require("./loggers/bind");

// timestamps, functional logging level
module.exports = require("./loggers/wrapper");
