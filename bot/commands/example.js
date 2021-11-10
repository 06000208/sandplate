const CommandBlock = require("../../modules/CommandBlock");
const { Formatters: { codeBlock }, Permissions: { FLAGS: {
    VIEW_CHANNEL,
    SEND_MESSAGES,
} } } = require("discord.js");

module.exports = new CommandBlock({
    names: ["example"],
    clientChannelPermissions: [VIEW_CHANNEL, SEND_MESSAGES],
}, function(client, message, content, args) {
    /** @todo quality-control: this should be character limited, easily exceeds 2000 characters if used with a large input */
    if (!content) return message.channel.send(`hello world, ${message.author.tag}!`);
    message.channel.send(`\`${message.author.tag}\`, you ran this example command with:\n${codeBlock(content)}and that parsed into arguments as:\n\`${args.join("`, `")}\``);
});
