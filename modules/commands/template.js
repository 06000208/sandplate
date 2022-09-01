const CommandBlock = require("../../modules/CommandBlock");
const log = require("../../modules/log");
const { Permissions: { FLAGS: {
    VIEW_CHANNEL,
    SEND_MESSAGES,
} } } = require("discord.js");

// all keys other than names can be set to null or omitted for default value
// refer to CommandBlock.js for documentation

/** @todo This template should correspond with CommandBlock defaults */
module.exports = new CommandBlock({
    names: ["template"],
    summary: "An example command",
    description: null,
    usage: null,
    channelTypes: ["DM", "GUILD_TEXT", "GUILD_NEWS", "GUILD_NEWS_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"],
    nsfw: false,
    locked: false,
    clientPermissions: null,
    clientChannelPermissions: [VIEW_CHANNEL, SEND_MESSAGES],
    userPermissions: null,
    userChannelPermissions: null,
}, function(client, message, content, args) {
    const text = `hello world, ${message.author.tag}!`;
    log.trace(text);
    message.channel.send(text);
});
