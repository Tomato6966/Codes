const Discord = require('discord.js'); //v12

const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  shards: "auto",
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.login('token');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    if (!message.guild || message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();   
    if (message.partial) await message.fetch();
    let prefix = "!";
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0){
      if(matchedPrefix.includes(client.user.id))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor("BLURPLE")
          .setTitle(`:thumbsup:  **To see all Commands type: \`${prefix}help\`**`)
        );
      return;
      }

    if(cmd == "ping") {
      return message.reply(`:ping_pong: **PONG! Api Ping is: \`${client.ws.ping}ms\`**`)
    }
});



function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}