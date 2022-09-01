import process from "node:process";
import { version as discordVersion } from "discord.js";
import { name, version as packageVersion } from "../constants.js";
import { log } from "../log.js";

log.info({
    "nodeVersion": process.versions.node,
    "discordVersion": discordVersion,
    "version": packageVersion,
    "platform": process.platform,
    "dev": process.env.dev?.toLowerCase() === "true",
}, `Starting ${name}`);

/** @todo what variable should be used for dev mode? dev, node_dev, env, node_env, etc */
// if (process.env.NODE_ENV === "development") log.info("Running in a development environment (NODE_ENV set to \"development\")");
