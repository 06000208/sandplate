const { exit, env } = require("node:process");
const { GatewayIntentBits, Partials } = require("discord.js");
const { Discord } = require("@a06000208/discord-framework");
const { envFlags } = require("./constants.js");
const log = require("./log");

/**
 * @type {Discord}
 * @see https://github.com/06000208/discord-framework/
 */
module.exports.discord = new Discord({
    clientOptions: {
        /**
         * @todo discordjs v13 & v14: It should be possible to parse content from
         * messages that ping the bot without the GuildMessages intent, possibly
         * using the message partial? "Messages in which the bot is mentioned" quote
         * from https://support-dev.discord.com/hc/en-us/articles/4404772028055
         * @see https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayIntentBits
         * @see https://discord.com/developers/docs/topics/gateway#list-of-intents
         */
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.DirectMessages,
        ],
        allowedMentions: {
            parse: [],
            users: [],
            roles: [],
            repliedUser: false,
        },
        /**
         * @see https://discordjs.guide/additional-info/changes-in-v13.html#dm-channels
         * @see https://discordjs.guide/additional-info/changes-in-v14.html#enum-values
         * @see https://discordjs.guide/popular-topics/partials.html
         */
        partials: [
            Partials.Channel,
        ],
    },
});

// self invoking asynchronous function
(async () => {
    try {
        await module.exports.discord.login(env[envFlags.discordToken]);
    } catch (error) {
        switch (error.message) {
            case "TOKEN_MISSING":
                log.fatal("no token was supplied, exiting");
                break;
            case "TOKEN_INVALID":
                log.fatal("the supplied token was invalid, exiting");
                break;
            case "TOKEN_INVALID_REGEX":
                log.fatal("the supplied token was invalid, exiting");
                break;
            default:
                console.error(error);
                log.fatal(
                    { "error": error.name || null, "stack": error.stack || null },
                    `an unknown issue with the token or signing in occured, ${error.message || "no message"}, see console for more information`,
                );
                break;
        }
        exit(1);
    }
})();

// const commandLoadResult = await client.handler.requireDirectory(client.commands, client.config.get("commands.directory").value(), true);
// const eventLoadResult = await client.handler.requireDirectory(client.events, client.config.get("events.directory").value(), true);
// log.info(commandLoadResult.message);
// log.info(eventLoadResult.message);
