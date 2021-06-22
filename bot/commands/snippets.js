const CommandBlock = require("../../modules/CommandBlock");
const log = require("../../modules/log");
const chalk = require("chalk");
const { MessageEmbed, Permissions } = require("discord.js");
const sandplate = require("../../sandplate.json");
const package = require("../../package.json");
const Discord = require("discord.js");
const { randomBytes } = require("crypto");
const moment = require("moment");
const { has } = require("lodash");

const snippets = {
  guilds: function(client, message, content, args) {
    let list = "", unavailable = 0;
    client.guilds.cache.each(guild => {
      if (guild.available) {
        list += `\n${guild.name} ${chalk.gray(`(${guild.id})`)}`;
      } else {
        ++unavailable;
      }
    });
    const description = `list of ${client.user.tag}'s ${client.guilds.cache.size} ${client.guilds.cache.size === 1 ? "guild" : "guilds"}${unavailable ? ` (${unavailable} unavailable)` : ""}`;
    log.info(`A ${description}, requested by ${message.author.tag}${list}`);
    message.channel.send(`Printed a ${description} to the console`);
  },
  info: function(client, message, content, args) {
    const embed = new MessageEmbed()
      .setTitle("Developer Info")
      .setDescription(`${client.user} v${package.version}\n[node.js](https://nodejs.org/) ${process.version}\n[discord.js](https://discord.js.org/) v${Discord.version}\n[sandplate](https://github.com/06000208/sandplate) v${sandplate.version}\n[platform](https://nodejs.org/api/process.html#process_process_platform) ${process.platform}`);
    const color = client.config.get("metadata.color").value();
    if (color) embed.setColor(color);
    message.channel.send(embed);
  },
  emoji: function(client, message, content, args) {
    if (message.channel.type === "dm") return message.channel.send("No custom emojis for direct messages");
    message.channel.send(message.guild.emojis.cache.map(emoji=>emoji.toString()).join(" "));
  },
  ascii: function(client, message, content, args) {
    let characters = "";
    for (let i = 32; i <= 127; i++) characters += String.fromCharCode(i);
    message.channel.send(characters);
  },
  coin: function(client, message, content, args) {
    message.channel.send((randomBytes(1)[0] & 1) == 1 ? "Heads" : "Tails");
  },
  time: function(client, message, content, args) {
    message.channel.send(`${moment().format("MMMM Do[,] dddd[,] h:mm a")}`);
  },
  permissions: function(client, message, content, args) {
    const perms = message.channel.permissionsFor(message.guild.me);
    const has = perms.toArray().join("\n").toLowerCase();
    const missing = perms.missing(Permissions.ALL).join("\n").toLowerCase();
    const embed = new MessageEmbed()
      .setTitle("Permissions")
      .addFields(
        { name: "Has", value: has.length ? has : "none", inline: true },
        { name: "Missing", value: missing.length ? missing : "none", inline: true },
      );
    if (perms.bitfield.toString().length) embed.setFooter(perms.bitfield.toString());
    const color = client.config.get("metadata.color").value();
    if (color) embed.setColor(color);
    message.channel.send(embed);
  },
  user: async function(client, message, content, args) {
    const application = await client.fetchApplication();
    const team = has(application.owner, "members");
    const embed = new MessageEmbed()
      .setTitle(client.user.tag)
      .setThumbnail(client.user.avatarURL({ format: "png" }))
      .addFields(
        { name: team ? "Team Owner" : "Owner", value: `<@${team ? application.owner.owner.id : application.owner.id}>`, inline: true },
        { name: "Public", value: application.botPublic, inline: true },
        { name: "Verified", value: client.user.verified, inline: true },
      )
      .setFooter(client.user.id)
      .setTimestamp(client.user.createdTimestamp);
    const color = client.config.get("metadata.color").value();
    if (color) embed.setColor(color);
    message.channel.send(embed);
  },
};

module.exports = new CommandBlock({
  identity: ["snippets", "snip"],
  summary: "Various code snippets for developers",
  description: null,
  usage: "<snippet name> [args]",
  locked: "hosts",
  clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
  userPermissions: null,
}, function(client, message, content, [choice, args]) {
  const keys = Object.keys(snippets);
  const list = "`" + keys.join("`, `") + "`";
  if (!content) return message.channel.send(`What snippet do you want to run?\n${list}`);
  if (!keys.includes(choice)) return message.channel.send(`Unrecognized snippet\n${list}`);
  snippets[choice](client, message, content, args);
});
