//we will use cron job a great pacakge to execute timeshedules!
//docs: https://github.com/kelektiv/node-cron
//live expression show of test: https://cronjob.xyz
//informations: https://www.easycron.com/faq/What-cron-expression-does-easycron-support

//seconds(0-59) minutes(0-25) hours(0-23) dayofmonth(1-31) month(0-11) dayofweek(0-6) === * * * * * *
//   Asterisk. E.g. *       
//   Ranges. E.g. 1-3,5         * 0 */2 * * *   === runs evey 2 hours at "0" minute  
//   Steps. E.g. */2


const Discord = require("discord.js");
const client = new Discord.Client();
client.login("YOURTOKEN");

//CODE ...

//define the cronconfiguration for the edit messages
const edit_msg_config = {
  channel_id: "yourchannelid_mustgoinhere",
  message_id: "yourmessageid_mustgoinhere",
}

//your cronjob which will runs evey 2 hours at "0" minute 
var CronJob = require('cron').CronJob;
  var job = new CronJob('0 */2 * * *', function() {
     edit_msg(client) //call the function to edit a message
  }, null, true, 'Europe/Berlin');
job.start();

//function to edit the message param edit_msg {*} client ... your DiscordClient usually defined by: const client = new Discord.Client();
async function edit_msg(client){ 
  //uncomment if there are parameters in the config up there!
  //let channel = await client.channels.fetch(edit_msg_config.channel_id); //get the channel where the message is which u want to edit
  //let message = await channel.messages.fetch(edit_msg_config.message_id); //get the message u want to edit
  //message.edit(`Your New Message Created at: ${String(new Date).split(" ", 5).join(" ")}`) //edit the message with your new content ;)
  console.log(`Your New Message Created at: ${String(new Date).split(" ", 5).join(" ")}`)
}

//code...
