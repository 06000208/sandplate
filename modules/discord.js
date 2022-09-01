import { Client, Collection, Intents } from "discord.js";
import { listenerDirectory, messageCommandsDirectory } from "./constants.js";
import { log } from "./log";

// Instantiate client
export const client = new Client({
    /**
     * @todo discordjs-v13: It should be possible to parse content from messages that ping the bot without the GUILD_MESSAGES intent, possibly using the message partial? "Messages in which the bot is mentioned" quote from https://support-dev.discord.com/hc/en-us/articles/4404772028055
     * @see https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS
     * @see https://discord.com/developers/docs/topics/gateway#list-of-intents
     */
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
    allowedMentions: {
        parse: [],
        users: [],
        roles: [],
        repliedUser: true,
    },
    /**
     * @see https://discordjs.guide/additional-info/changes-in-v13.html#dm-channels
     * @see https://discordjs.guide/popular-topics/partials.html
     */
    partials: ["CHANNEL"],
});


/**
 * Arbitrary Collection
 * @type {Collection<*, *>}
 */
export const cookies = new Collection();

/**
 * Handler framework
 * @type {Handler}
 */
export const handler = new Handler();

/**
 * Commands
 * @type {CommandConstruct}
 */
export const messageCommands = new CommandConstruct(this, "bot command construct");

/**
 * Events
 * @type {EventConstruct}
 */
export const events = new EventConstruct(this, "discord.js event construct");

const commandLoadResult = await client.handler.requireDirectory(client.commands, messageCommandsDirectory, true);
const eventLoadResult = await client.handler.requireDirectory(client.events, listenerDirectory, true);
log.info(commandLoadResult.message);
log.info(eventLoadResult.message);
