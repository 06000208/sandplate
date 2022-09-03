const { Team } = require("discord.js");
const ListenerBlock = require("../ListenerBlock");
const log = require("../log");

module.exports = new ListenerBlock({
    event: "ready",
    once: true,
}, async function(client) {
    // This code runs after the bot is online and workable, as this is a listener for the ready event
    // It will only run once, so it's safe to use for things such as scheduling tasks or other one time operations

    // Add the bot's owner(s) to hosts user group
    // If the users.hosts group is an empty array, this won't happen
    if (client.config.get("users.hosts").value() === null && client.application.owner) {
        // Right now, all members of a team have Admin, so they can access the bot token
        // So I'm not too worried about adding all team members, but this should be changed soon for future proofing
        // Could filter() based on TeamMember.permissions but I don't know what strings are used in that array
        const owners = client.application.owner instanceof Team ? [...client.application.owner.members.values() ] : [client.application.owner.id];
        client.config.set("users.hosts", owners).write();
        log.info(`Added the bot's owners to the hosts user group`, owners);
    }

    log.info("App is now fully functional");
});
