/**
 * This module is used to pipe logging to your logging module of choice, easily changed below via commenting
 *
 * This is a compromise attempting to provide the most freedom with the least amount of code change or impact on git
 *
 * Note that any of the provided loggers work on their own when used directly
 *
 * Loggers used with this module are expected export an object following functions:
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
// export * from "./loggers/none.js";

// aesthetic logging level, compatibility with debuggers
// export * from "./loggers/bind.js";

// aesthetic logging level, timestamps
export * from "./loggers/wrapper.js";
