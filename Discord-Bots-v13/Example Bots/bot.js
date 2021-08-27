const Discord = require('discord.js'); //v13
const client = new Discord.Client({
    shards: "auto",
    allowedMentions: {
      parse: ["roles", "users", /* "everyone" */],
      repliedUser: false, //set true if you want to ping the bot on reply messages
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
      //Discord.Intents.FLAGS.GUILD_MEMBERS,
      //Discord.Intents.FLAGS.GUILD_BANS,
      //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
      //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
      //Discord.Intents.FLAGS.GUILD_INVITES,
      //Discord.Intents.FLAGS.GUILD_VOICE_STATES,
      //Discord.Intents.FLAGS.GUILD_PRESENCES,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      //Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
      //Discord.Intents.FLAGS.DIRECT_MESSAGES,
      //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
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
        return message.reply({embeds: [new Discord.MessageEmbed()
          .setColor("BLURPLE")
          .setTitle(`:thumbsup:  **To see all Commands type: \`${prefix}help\`**`)
        ]});
      return;
      }

    if(cmd == "ping") {
      return message.reply(`:ping_pong: **PONG! Api Ping is: \`${client.ws.ping}ms\`**`)
    }
});



function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}