# 1. Define Each EQ
```js
client.defaultEQ = [
  { band: 0, gain: 0.15 },
  { band: 1, gain: 0.05 }, 
  { band: 2, gain: 0.025 }, 
  { band: 3, gain: 0 }, 
  { band: 4, gain: 0 }, 
  { band: 5, gain: -0.025 }, 
  { band: 6, gain: -0.05 },
  { band: 7, gain: -0.0175 }, 
  { band: 8, gain: 0 }, 
  { band: 9, gain: 0 }, 
  { band: 10, gain: 0.025 }, 
  { band: 11, gain: 0.05 }, 
  { band: 12, gain: 0.15 },
  { band: 13, gain: 0.25 }, 
  { band: 14, gain: 0.25 }
]
client.bassboost = {
  none: client.defaultEQ,
  low: [
    { band: 0, gain: 0.125 },
    { band: 1, gain: 0.25 }, 
    { band: 2, gain: -0.25 }, 
    { band: 3, gain: -0.125 }, 
    { band: 4, gain: 0 }, 
    { band: 5, gain: -0.025 }, 
    { band: 6, gain: -0.05 },
    { band: 7, gain: -0.0175 }, 
    { band: 8, gain: 0 }, 
    { band: 9, gain: 0 }, 
    { band: 10, gain: 0.025 }, 
    { band: 11, gain: 0.05 }, 
    { band: 12, gain: 0.15 },
    { band: 13, gain: 0.25 }, 
    { band: 14, gain: 0.25 }
  ],
  medium: [
    { band: 0, gain: 0.25 },
    { band: 1, gain: 0.5 }, 
    { band: 2, gain: -0.5 }, 
    { band: 3, gain: -0.25 }, 
    { band: 4, gain: 0 }, 
    { band: 5, gain: -0.025 }, 
    { band: 6, gain: -0.05 },
    { band: 7, gain: -0.0175 }, 
    { band: 8, gain: 0 }, 
    { band: 9, gain: 0 }, 
    { band: 10, gain: 0.025 }, 
    { band: 11, gain: 0.05 }, 
    { band: 12, gain: 0.15 },
    { band: 13, gain: 0.25 }, 
    { band: 14, gain: 0.25 }
  ],
  high: [
    { band: 0, gain: 0.375 },
    { band: 1, gain: 0.75 }, 
    { band: 2, gain: -0.75 }, 
    { band: 3, gain: -0.375 }, 
    { band: 4, gain: 0 }, 
    { band: 5, gain: -0.025 }, 
    { band: 6, gain: -0.05 },
    { band: 7, gain: -0.0175 }, 
    { band: 8, gain: 0 }, 
    { band: 9, gain: 0 }, 
    { band: 10, gain: 0.025 }, 
    { band: 11, gain: 0.05 }, 
    { band: 12, gain: 0.15 },
    { band: 13, gain: 0.25 }, 
    { band: 14, gain: 0.25 }
  ],
  earrape: [
    { band: 0, gain: 0.5 },
    { band: 1, gain: 1 }, 
    { band: 2, gain: -1 }, 
    { band: 3, gain: -0.5 }, 
    { band: 4, gain: 0 }, 
    { band: 5, gain: -0.025 }, 
    { band: 6, gain: -0.05 },
    { band: 7, gain: -0.0175 }, 
    { band: 8, gain: 0 }, 
    { band: 9, gain: 0 }, 
    { band: 10, gain: 0.025 }, 
    { band: 11, gain: 0.05 }, 
    { band: 12, gain: 0.15 },
    { band: 13, gain: 0.25 }, 
    { band: 14, gain: 0.25 }
  ]
}
```
**technically medium is the highest, but high is OK, and earrape yeah...**

# 2. Bassboost command based on Discord.js Example handler and my [My handler teamplate](https://github.com/Tomato6966/Discord-Js-Handler-Template)
```js
const {MessageEmbed} = require("discord.js")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "bassboost",
    category: "👀 Filter",
    aliases: ["bb"],
    description: "Changes the Bass gain",
    usage: "bassboost <none/low/medium/high>",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      
      let level = "none";
       
      if (!args.length || (!client.bassboost[args[0].toLowerCase()] && args[0].toLowerCase() != "none") ) return message.reply("Bass boost level must be one of the following: `none`, `low`, `medium`, `high`, `earrape`");
      level = args[0].toLowerCase();
      switch(level){
        case "none":
            player.setEQ(client.bassboost.none)
          break;
          case "low":
            player.setEQ(client.bassboost.low)
          break;
          case "medium":
            player.setEQ(client.bassboost.medium)
          break;
          case "high":
            player.setEQ(client.bassboost.high)
          case "earrape":
            player.setEQ(client.bassboost.high)
          break;
      }
      const embed = new MessageEmbed()
      .setTitle(`:white_check_mark: Set the bass boost to \`${level}\`.`)
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      return message.reply(embed);
    }
};
```
*hope you like it ;)*
