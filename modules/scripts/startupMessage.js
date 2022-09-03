const process = require("node:process");
const { version: discordVersion } = require("discord.js");
const { name, packageData } = require("../constants.js");
const log = require("../log.js");

log.info({
    "nodeVersion": process.versions.node,
    "discordVersion": discordVersion,
    "version": packageData.version,
    "platform": process.platform,
}, `Starting ${name}`);
