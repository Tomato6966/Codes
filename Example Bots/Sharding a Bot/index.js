//import the Discord Library
const Discord = require("discord.js");
//import the config file
const config = require("./config.json");
//create a new Client
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
//READY EVENT
client.on("ready", () => {
  console.log(`${client.user.tag} Is now ready use. WAIT FOR ALL SHARDS TO GET READY!`);
  change_status(client);
  setInterval(()=>{
    change_status(client);
  }, 15 * 1000);
})
//MESSAGE EVENT
client.on("message", async message => {
// Ignore all bots and not guilds
  if (message.author.bot || !message.guild) return;
  // Ignore messages not starting with the prefix
  if (message.content.indexOf(config.prefix) !== 0) return;
  // Our standard argument/command name definition.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd.length) return;

  switch(cmd){
    case "ping":
      {
        const msg = await message.channel.send(`🏓 Pinging....`);
        msg.edit(`🏓 Pong!\nMy Ping is \`${Math.round(client.ws.ping)}ms\``);
      }
    break;
    case "say":
      {
        if(!args[0]) return message.reply("Please add what you want to say")
        message.channel.send(args.join(" "))
      }
    break;
    case "info":
      {
        const promises = [
          client.shard.fetchClientValues('guilds.cache.size'),
          client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
        ];
        return Promise.all(promises).then(async results => {
          const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
          const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
          let guilds = [], users = [];
          let counter = 0;
          for(let item of results[0]) guilds.push(`Shard #${counter++}: ${item} Guilds`)
          counter = 0;
          for(let item of results[1]) users.push(`Shard #${counter++}: ${item} Users`)

          message.channel.send(`**📁 Users:** \`Total: ${totalMembers} Users\`\n\`\`\`fix\n${users.join("\n")}\n\`\`\`\n\n**📁 Servers:** \`Total: ${totalGuilds} Servers\`\n\`\`\`fix\n${guilds.join("\n")}\n\`\`\``);
        }).catch(console.error);
      }
    break;
    default:
      {
        message.reply(`Unkown cmd! those are mine: \`${config.prefix}ping\`, \`${config.prefix}say\`, \`${config.prefix}info\``)
      }
    break;
  }
});
//login to the BOT
client.login(config.token);
//FUNCTION TO CHAGNE THE STATUS
function change_status(client){
  try{
    const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
		];
		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
        for(const shard of client.shard.ids)
          //custom status per shard ;)
        client.user.setActivity(`milrato.eu | #${shard} Shard | ${totalGuilds} Guilds | ${Math.ceil(totalMembers/1000)}k Members`, {type: "WATCHING", shardID: shard});
			}).catch(console.error);
  }catch (e) {
      client.user.setActivity(`milrato.eu | #0 Shard | ${client.guilds.cache.size} Guilds | ${Math.ceil(client.users.cache.size/1000)}k Members`, {type: "WATCHING", shardID: 0});
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
