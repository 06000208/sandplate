import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";
import process, { version as nodeVersion } from "node:process";
import { version as discordVersion } from "discord.js";
import dotenv from "dotenv";
import { log } from "./modules/log.js";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));

// Parse package.json
const { name: projectName, version: projectVersion } = JSON.parse(readFileSync(join(moduleDirectory, "package.json")));

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
const [nodeMajor, nodeMinor] = nodeVersion.slice(1).split(".");
const [discordMajor, discordMinor] = discordVersion.split(".");
if (Number(nodeMajor) < 16 || Number(nodeMinor) < 9) {
    log.fatal(`node.js v16.9+ is required, currently ${nodeVersion}`);
    process.exit(1);
} else if (Number(discordMajor) < 13 || Number(discordMinor) < 6) {
    log.fatal(`discord.js v13.6+ is required, currently v${discordVersion}`);
    process.exit(1);
} else {
    log.info(`Starting ${projectName} v${projectVersion} using node.js ${nodeVersion} and discord.js v${discordVersion} on ${process.platform}`);
}

// Populate environment variables
const envName = "";
const envFile = envName + ".env";
const envPath = join(moduleDirectory, envFile);
if (existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    if (result.parsed) log.info(`Loaded environment variables from "${envFile}":`, Object.keys(result.parsed));
} else {
    log.info(`Skipped loading environment variables from file, no "${envFile}" file to load`);
}

if (process.env.NODE_ENV === "development") log.info("Running in a development environment (NODE_ENV set to \"development\")");

// Temporary
(async function() {
    await import("./bot.js");
})();
