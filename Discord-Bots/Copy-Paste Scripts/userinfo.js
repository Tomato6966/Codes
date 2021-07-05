const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
  if (arr.array().length > maxLen) {
    const len = arr.array().length - maxLen;
    arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
    arr.map(role => `<@&${role.id}>`)
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}
const statuses = {
  "online" : "🟢",
  "idle" : "🟠",
  "dnd" : "🔴",
  "offline" : "⚫️",
}
module.exports = {
  name: "userinfo",
  aliases: ["uinfo"],
  category: "🔰 Info",
  description: "Get information about a user",
  usage: "userinfo [@USER] [global/guild]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {   
      var user;
      if(args[0]){
        try{
          if(args[1] && args[1].toLowerCase() == "global"){
            args.pop()
            user = await GetGlobalUser(message, args)
          }else {
            user = await GetUser(message, args)
          }
        }catch (e){
          if(!e) return message.reply("UNABLE TO FIND THE USER")
          return message.reply(e)
        }
      }else{
        user = message.author;
      }
      if(!user || user == null || user.id == null || !user.id) return message.reply("<:no:833101993668771842> Could not find the USER")
      try{
        const member = message.guild.members.cache.get(user.id);
        const roles = member.roles;
        const userFlags = member.user.flags.toArray();
        const activity = member.user.presence.activities[0];
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Information about:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
        embeduserinfo.addField('**<:arrow:832598861813776394> Username:**',`<@${member.user.id}>\n\`${member.user.tag}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> ID:**',`\`${member.id}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Date Join DC:**', "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Date Join Guild:**', "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Flags:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Status:**',`\`${statuses[member.user.presence.status]} ${member.user.presence.status}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Highest Role:**',`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Is a Bot:**',`\`${member.user.bot ? "✔️" : "❌"}\``,true)
        var userstatus = "Not having an activity";
        if(activity){
          if(activity.type === "CUSTOM_STATUS"){
            let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
            userstatus = `${emoji} \`${activity.state || 'Not having an acitivty.'}\``
          }
          else{
            userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
          }
        }
        embeduserinfo.addField('**<:arrow:832598861813776394> Activity:**',`${userstatus}`)
        embeduserinfo.addField('**<:arrow:832598861813776394> Permissions:**',`${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.addField(`<:arrow:832598861813776394> [${roles.cache.size}] Roles: `, roles.cache.size < 25 ? roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None')
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        message.channel.send(embeduserinfo)
      }catch{
        const userFlags = user.flags.toArray();
        const activity = user.presence.activities[0];
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Information about:   " + user.username + "#" + user.discriminator, user.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
        embeduserinfo.addField('**<:arrow:832598861813776394> Username:**',`<@${user.id}>\n\`${user.tag}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> ID:**',`\`${user.id}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Avatar:**',`[\`Link to avatar\`](${user.displayAvatarURL({ format: "png" })})`,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Flags:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Status:**',`\`${statuses[user.presence.status]} ${user.presence.status}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Is a Bot:**',`\`${user.bot ? "✔️" : "❌"}\``,true)
        var userstatus = "Not having an activity";
        if(activity){
          if(activity.type === "CUSTOM_STATUS"){
            let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
            userstatus = `${emoji} \`${activity.state || 'Not having an acitivty.'}\``
          }
          else{
            userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
          }
        }
        embeduserinfo.addField('**<:arrow:832598861813776394> Activity:**',`${userstatus}`)
        embeduserinfo.addField('**<:arrow:832598861813776394> Permissions:**',`${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        message.channel.send(embeduserinfo)
      }
      
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
