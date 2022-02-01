/**
 * If desired you may modify this file to change constants (timestamp format, terminal styling, etc) used by the default logging modules
 * @module constants/logging
 */

import chalk from "chalk";

/**
 * Chalk function used for the timestamp, otherwise null for no styling
 * @type {?import("chalk").Chalk}
 */
const timestampStyle = chalk.gray;

/**
 * Timestamp format string
 *
 * Used with [DateTime#toFormat](https://moment.github.io/luxon/api-docs/index.html#datetimetoformat), so you may use [luxon's formatting tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)
 *
 * Escape characters by encasing them inside brackets
 * @type {string}
 * @todo Update this to use luxon's intended method for constructing abstract date formats instead
 */
const timestampFormat = "HH:mm:ss.SSS";

/**
 * Chalk functions used for logging level labels
 * @type {Object.<string, import("chalk").Chalk>}
 */
const styles = {
    "fatal": chalk.bgRed.black,
    "error": chalk.red,
    "warn": chalk.yellow,
    "info": chalk.white.bold,
    "debug": chalk.green,
    "trace": chalk.gray,
};

export { timestampStyle, timestampFormat, styles };
