const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "ping",
  category: "🔰 Info",
  aliases: ["latency"],
  cooldown: 2,
  usage: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let date1 = Date.now()
      message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`${emoji.msg.ping} Pinging....`)
      ).then(msg => {
        msg.edit({embed: new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`${emoji.msg.ping} Ping: \`${Math.floor(Date.now() -date1)}ms\`\n\n${emoji.msg.ping} Api Latency: \`${Math.floor(client.ws.ping)}ms\``)
        });
      })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
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
