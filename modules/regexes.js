/**
 * This module contains useful regular expressions
 *
 * Note that there are also useful regexes in discord.js:
 *
 * - [GuildTemplate.GuildTemplatesPattern](https://discord.js.org/#/docs/discord.js/14.3.0/class/GuildTemplate?scrollTo=s-GuildTemplatesPattern)
 * - [Invite.InvitesPattern](https://discord.js.org/#/docs/discord.js/14.3.0/class/Invite?scrollTo=s-InvitesPattern)
 * - [MessageMentions.EveryonePattern](https://discord.js.org/#/docs/discord.js/14.3.0/class/MessageMentions?scrollTo=s-EveryonePattern)
 * - [MessageMentions.UsersPattern](https://discord.js.org/#/docs/discord.js/14.3.0/class/MessageMentions?scrollTo=s-UsersPattern)
 * - [MessageMentions.RolesPattern](https://discord.js.org/#/docs/discord.js/14.3.0/class/MessageMentions?scrollTo=s-RolesPattern)
 * - [MessageMentions.ChannelsPattern](https://discord.js.org/#/docs/discord.js/14.3.0/class/MessageMentions?scrollTo=s-ChannelsPattern)
 *
 * As well as sapphiredev's [discord-utilities](https://www.sapphirejs.dev/docs/Documentation/api-utilities/modules/discord_utilities_src)
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#creating_a_regular_expression
 * @module regexes
 */

/**
 * Matches only characters in the ranges A-Z and a-z from the beginning to the end of the string.
 */
module.exports.alphabetic = /^[A-Za-z]+$/;

/**
 * Matches only digit characters (0-9) from the beginning to the end of the string.
 */
module.exports.numeric = /^\d+$/;

/**
 * Matches only characters in the ranges A-Z, a-z, and any digit character (0-9) from the beginning to the end of the string.
 */
module.exports.alphanumeric = /^[A-Za-z\d]+$/;
