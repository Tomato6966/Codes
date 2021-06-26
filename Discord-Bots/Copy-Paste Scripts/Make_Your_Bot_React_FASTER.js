const Discord = require('discord.js');
//creating the client
const client = new Discord.Client({
    restTimeOffset: 0
});
//Defining all emojis
const emojis = [ "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈"]
//logging when bot is ready
client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`) );
//executing the Cmd
client.on('message', msg => {
  if(!msg.guild || msg.author.bot) return;
  if (msg.content === '!react') {
    const date1 = Date.now();
    msg.reply('REACTING...').then(async msg => {
        for(const emoji of emojis)  await msg.react(emoji)
        msg.edit(`It took me: ${(Date.now() - date1) / 1000} Seconds to react with ${emojis.length} Emojis!`)
    }).catch(e=>console.log(e));
  }
});
//logging in the BOT
client.login("YOUR BOT TOKEN")
