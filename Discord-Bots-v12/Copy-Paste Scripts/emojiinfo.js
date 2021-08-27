const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const moment = require("moment")
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
module.exports = {
  name: "emojiinfo",
  aliases: ["infoemoji"],
  category: "🔰 Info",
  description: "See Information about an emji",
  usage: "emojiinfo <EMOJI>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let hasEmoteRegex = /<a?:.+:\d+>/gm
      let emoteRegex = /<:.+:(\d+)>/gm
      let animatedEmoteRegex = /<a:.+:(\d+)>/gm

      if(!message.content.match(hasEmoteRegex))
        return message.reply("<:no:833101993668771842> Your message does not include a VALID Emoji, please retry by adding a guild specific emoji!")
      
      if (emoji1 = emoteRegex.exec(message)) {
        let url = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".png?v=1"
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emoji1[1] || emj.id == emoji1[1])
        if(!emoji) return message.channel.send("Please provide a custom Emoji from **THIS GUILD**")
      
        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? "✅" : "❌" ;
        const embed = new MessageEmbed()
        .setTitle(`**Emoji Information for: __\`${emoji.name.toLowerCase()}\`__**`)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setThumbnail(emoji.url)
        .addField("**General:**", [
          `**ID:** \`${emoji.id}\``,
          `**URL:** [\`LINK\`](${emoji.url})`,
          `**AUTHOR:** ${authorFetch} (\`${authorFetch.id}\`)`,
          `**CREATED AT:** \`${moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " +  moment(emoji.createdTimestamp).format("hh:mm:ss")}\``
        ])
        .addField("**Others:**", [
          `**Requires Colons:** \`${checkOrCross(emoji.requireColons)}\``,
          `**Animated:** \`${checkOrCross(emoji.animated)}\``,
          `**Deleteable:** \`${checkOrCross(emoji.deleteable)}\``,
          `**Managed:** \`${checkOrCross(emoji.managed)}\``,
        ]).setFooter(es.footertext, es.footericon)
        message.channel.send(embed)
      }
      else if (emoji1 = animatedEmoteRegex.exec(message)) {
        let url2 = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".gif?v=1"
        let attachment2 = new Discord.MessageAttachment(url2, "emoji.gif")
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emoji1[1] || emj.id == emoji1[1])
        if(!emoji) return message.channel.send("Please provide a custom Emoji from **THIS GUILD**")
      
        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? "✅" : "❌" ;
        const embed = new MessageEmbed()
        .setTitle(`**Emoji Information for: __\`${emoji.name.toLowerCase()}\`__**`)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setThumbnail(emoji.url)
        .addField("**General:**", [
          `**ID:** \`${emoji.id}\``,
          `**URL:** [\`LINK\`](${emoji.url})`,
          `**AUTHOR:** ${authorFetch} (\`${authorFetch.id}\`)`,
          `**CREATED AT:** \`${moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " +  moment(emoji.createdTimestamp).format("hh:mm:ss")}\``
        ])
        .addField("**Others:**", [
          `**Requires Colons:** \`${checkOrCross(emoji.requireColons)}\``,
          `**Animated:** \`${checkOrCross(emoji.animated)}\``,
          `**Deleteable:** \`${checkOrCross(emoji.deleteable)}\``,
          `**Managed:** \`${checkOrCross(emoji.managed)}\``,
        ]).setFooter(es.footertext, es.footericon)
        message.channel.send(embed)
      }
      else {
        message.channel.send("Couldn't find an emoji to paste! if it's uniced(standard) and not a guild Emoji, it's not possible!")
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
