const fs = require("fs");
const path = require("path");
const process = require("process");
const dotenv = require("dotenv");
const Discord = require("discord.js");
const log = require("./modules/log");
const package = require("./package.json");
const { obscureObjectCredentials, parseCommaDelimitedString } = require("./modules/miscellaneous");

// node.js process event listeners (if you can improve these, please contribute!)
// https://nodejs.org/api/process.html (list is under Process Events)
process.on("uncaughtException", (error, origin) => {
    log.fatal(`${origin},`, error);
    return process.exit(1); // Always let code exit on uncaught exceptions
});
process.on("unhandledRejection", (reason, promise) => log.error(`unhandledRejection\n`, promise));
process.on("rejectionHandled", (promise) => log.debug("rejectionHandled\n", promise));
process.on("warning", (warning) => log.warn(warning));
process.on("exit", (code) => code === 0 ? log.info("Exiting peacefully") : log.warn("Exiting abnormally with code:", code));

// node.js and discord.js version checks
// version < minVersion
const [nodeMajor, nodeMinor] = process.version.slice(1).split(".");
const [discordMajor, discordMinor] = Discord.version.split(".");
if (Number(nodeMajor) < 16 || Number(nodeMinor) < 6) {
    log.fatal(`node.js v16.6+ is required, currently ${process.version}`);
    process.exit(1);
} else if (Number(discordMajor) < 13 || Number(discordMinor) < 3) {
    log.fatal(`discord.js v13.3+ is required, currently v${Discord.version}`);
    process.exit(1);
} else {
    log.info(`Starting ${package.name} v${package.version} using node.js ${process.version} and discord.js v${Discord.version} on ${process.platform}`);
}

const envName = "";
const envFile = envName + ".env";
const envPath = path.join(__dirname, envFile);

if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    console.log(result);
    if (result.parsed) log.info(`Loaded environment variables from "${envFile}":`, obscureObjectCredentials(result.parsed, process.env.OBSCURED_VARIABLES ? parseCommaDelimitedString(process.env.OBSCURED_VARIABLES) : []));
} else {
    log.info(`Skipped loading environment variables from file, no "${envFile}" file to load`);
}

log.info(process.env.NODE_ENV === "development" ? "Running in a development environment (NODE_ENV set to \"development\")" : "Running in a standard or production environment (NODE_ENV unset/unrecognized)");

// Work in progress
require("./bot");
