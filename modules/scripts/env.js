/**
 * Populates environment variables using dotenv
 *
 * The design and use of this module is due to how dotenv and ecmascript modules
 * work internally
 *
 * Note that it isn't possible to use environment variables loaded this way
 * prior to this code running
 * @module scripts/env
 */

import { env } from "node:process";
import { join } from "node:path";
import dotenv from "dotenv";
import { log } from "../log.js";
import { environmentVariables, directory } from "../constants.js";

const externalVariables = environmentVariables.filter((variable) => Object.prototype.hasOwnProperty.call(env, variable));
if (externalVariables.length) log.info({ "variables": externalVariables }, "Environment variables");

// Don't need to load from file if all environment variables are present
if (externalVariables.length < environmentVariables.length) {
    const result = dotenv.config({
        override: false, // Prefer pre-existing and manually passed environment variables
        path: join(directory, ".env"),
    });
    if (result.parsed) log.info({ "variables": Object.keys(result.parsed).map(variable => variable.toLowerCase()).filter(variable => !externalVariables.includes(variable)) }, "Loaded environment variables from file");
}

/**
 * Information and control over the current Node.js process
 * @external process
 * @see https://nodejs.org/docs/latest/api/process.html
 */

/**
 * Environment variables
 * @see https://nodejs.org/docs/latest/api/process.html#process_process_env
 * @see https://www.npmjs.com/package/dotenv
 * @name env
 * @type {Object}
 * @readonly
 * @memberof external:process
 */
