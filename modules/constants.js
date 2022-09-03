const { readJsonSync } = require("fs-extra");
const { DateTime } = require("luxon");
const { join } = require("node:path");

/**
 * Used in various places, must be filename friendly on both windows and linux
 * @type {string}
 */
module.exports.name = "sandplate";

/**
 * Root directory
 * @type {string}
 */
module.exports.directory = join(__dirname, "..");

/**
 * @see https://docs.npmjs.com/cli/v8/configuring-npm/package-json
 * @type {Object}
 */
module.exports.packageData = readJsonSync(join(module.exports.directory, "package.json"));

/**
 * Start time for the app
 * @type {DateTime}
 */
module.exports.startTime = DateTime.now();

/**
 * Object containing lowerCamelCase keyed properties set to their corrosponding
 * but distinctly different snake_case environment variable names, in a manner
 * inspired by enum flags
 *
 * Note that when providing node.js with environment variables, including via
 * the .env file, they should follow google's naming standard and use
 * SCREAMING_SNAKE_CASE.
 * @see https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @see https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 */
module.exports.envFlags = {
    /** The bot's discord token */
    "discordToken": `${module.exports.name}_discord_token`,
    /** The bot's discord id*/
    "client": `${module.exports.name}_discord_client_id`,
    /** Ids of discord users which may run restricted commands, in a single string, separated by commas */
    "owners": `${module.exports.name}_discord_owner_ids`,
    /** Ids of discord guilds to deploy guild commands to, in a single string, separated by commas */
    "guilds": `${module.exports.name}_discord_guild_ids`,
};

/**
 * Array of valid environment variables in snake_case
 *
 * Note that when providing node.js with environment variables, including via
 * the .env file, they should follow google's naming standard and use
 * SCREAMING_SNAKE_CASE.
 * @see https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @see https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @type {string[]}
 */
module.exports.environmentVariables = Array.from(Object.values(module.exports.envFlags));
