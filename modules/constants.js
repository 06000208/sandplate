import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readJson } from "fs-extra";

/**
 * Used in various places, must be filename friendly on both windows and linux
 * @type {string}
 */
export const name = "sandplate";

/**
 * Root directory
 * @type {string}
 */
export const directory = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Directory of slash command modules
 */
export const slashCommandsDirectory = join(directory, "modules", "slashCommands");

/**
 * Directory of message command modules
 */
export const messageCommandsDirectory = join(directory, "modules", "messageCommands");

/**
 * Directory of event listeners
 */
export const listenerDirectory = join(directory, "modules", "listeners");

/**
 * @see https://docs.npmjs.com/cli/v8/configuring-npm/package-json
 * @type {Object}
 */
export const packageData = await readJson(join(directory, "package.json"));

/**
 * Current version, retrieved from package.json
 * @type {string}
 */
export const packageVersion = packageData.version;

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
export const envFlags = {
    /** The bot's discord token */
    "discordToken": `${name}_discord_token`,
    /** The bot's discord id*/
    "client": `${name}_discord_client_id`,
    /** Ids of discord users which may run restricted commands, in a single string, separated by commas */
    "owners": `${name}_discord_owner_ids`,
    /** Ids of discord guilds to deploy guild command interactions, in a single string, separated by commas */
    "guilds": `${name}_discord_guild_ids`,
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
export const environmentVariables = Array.from(Object.values(envFlags));
