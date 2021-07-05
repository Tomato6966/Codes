// Import the discord.js module
const Discord = require('discord.js');

const { GiveawaysManager } = require('discord-giveaways'); //npm i github:Tomato6966/discord-giveaways
// Create an instance of a Discord client
const client = new Discord.Client();
const prefix = "!";
client.on('ready', () => {
  console.log(`${client.user.tag} is Online`);
});

client.login('your token here');


client.on('message', message => {
  // If the message is "ping"
  if(!message.guild || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(" ")
  const cmd = args.shift();
  if(!cmd || cmd.length == 0 || !message.content.startsWith(prefix)) return;

  if (cmd.toLowerCase() === 'giveaway') {
    if (!args[0]) return message.reply(`PLEASE USE A VALID PARAMETER!\n\`${prefix}giveaway start\` -- *Starts a giveaway (follow the Steps)*\n\n\`${prefix}giveaway end <Giveaway_Id>\` -- *Ends a Giveaway*\n\n\`${prefix}giveaway edit <Giveaway_Id> <PRIZE>\` -- *Edits a Giveaway's Prize*\n\n\`${prefix}giveaway reroll <Giveaway_Id>\` -- *Rerolls an ended Giveaway*\n\n\`${prefix}giveaway list <server/all>\` -- *Lists all global / Server based Giveaways*`)
    var originalowner = message.author.id
    if (args[0].toLowerCase() === "start") {
        const filter = m => {
            return m.author.id == originalowner;
        };
        let giveawayChannel;
        await message.channel.send("In Which Cannel should the Giveaway start?\n\nPing it with: #Channel")
        try{
            var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
            var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(collected.first().content);
            if(!channel) throw "nomention"
            giveawayChannel = channel;
        }catch (error){
            
            if(error = "nomention") 
                return message.reply("You did not mention a valid Channel!")
            return message.reply("Your Time Ran out!")
        }
        let giveawayDuration;
        await message.channel.send(`For how long should the Giveaway last\n**Example:**\n> \`23h + 30m + 27s\``)
        try{
            var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
            gargs = collected.first().content.split("+");
            giveawayDuration = 0;
            for(const a of gargs){
                giveawayDuration += ms(a.split(" ").join(""))
            }
            if(!giveawayDuration || isNaN(giveawayDuration)) throw "notime";
        }catch (error){
            
            if(error = "notime") 
                return message.reply("You did not enter a valid time Format\nCancelled")
            return message.reply("Your Time Ran out!")
        }


        let giveawayNumberWinners;
        await message.channel.send("How Many Winners should the Giveaway have?\nExample: \`2\`")
        try{
            var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
            giveawayNumberWinners = collected.first().content;
            if(!giveawayNumberWinners || isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) throw "nowinners";
        }catch (error){
            
            if(error = "nowinners") 
                return message.reply("You did not enter a valid Winners Count")
            return message.reply("Your Time Ran out!")
        }

        
        let giveawayPrize;
        await message.channel.send("What should be the Giveaway Prize?\n**Example:**\n> \`1 x Nitro\`")
        try{
            var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
            giveawayPrize = collected.first().content;
        }catch (error){
            
            return message.reply("Your Time Ran out!")
        }
        client.giveawaysManager.start(giveawayChannel, {
            time: giveawayDuration,
            prize: `:gift: ${giveawayPrize} :gift:`,
            winnerCount: giveawayNumberWinners,
            hostedBy: message.author,
            embedColorEnd: "RED",
            embedColor: "BLUE",
            messages: {
                giveaway: '🎉 **A GIVEAWAY Started** 🎉',
                giveawayEnded: '🎉 **The GIVEAWAY Ended** 🎉',
                timeRemaining: 'Time remaining: **{duration}**!',
                inviteToParticipate: '*React with 🎉 to participate!*',
                winMessage: ':tada: **Congratulations,** {winners} :tada:\n\n> You won **{prize}**!\n\n**Jump to it:**\n> {messageURL}',
                embedFooter: 'Ends at: ',
                noWinner: 'Giveaway cancelled, no valid participations.',
                hostedBy: 'Hosted by: {user}',
                winners: giveawayNumberWinners == 1 ? 'Winner' : "Winners",
                before_winners: "❱❱",
                endedAt: 'Ended at',
                units: {
                    seconds: 'Seconds',
                    minutes: 'Minutes',
                    hours: 'Hours',
                    days: 'Days',
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });

        message.reply(`✅ **Started the Giveaway in:** ${giveawayChannel}!`);
        // And the giveaway has started!
    } else if (args[0].toLowerCase() === "end") {
        args.shift();
        if (!args[0]) {
            return message.channel.send(`<:no:833101993668771842> You have to specify a valid message ID! Usage: \`${prefix}giveaway end <ID>\``);
        }
        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.edit(giveaway.messageID, {
                setEndTimestamp: Date.now()
            })
            .then(() => {
                message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                    message.channel.send('This giveaway is already ended!');
                } else {
                    console.error(e);
                    message.channel.send('An error occured...');
                }
            });
    } else if (args[0].toLowerCase() === "reroll") {
        args.shift();
        if (!args[0]) {
            return message.channel.send(`<:no:833101993668771842> You have to specify a valid message ID! Usage: \`${prefix}giveaway edit <ID>\``);
        }
        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
        if (!giveaway) {
            return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
        }
        client.giveawaysManager.reroll(giveaway.messageID, { winnerCount: !isNan(args[1]) ? Number(args[1]) : 1})
            .then(() => {
                message.channel.send('✅ **Giveaway rerolled!**');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                    message.channel.send('<:no:833101993668771842> **This giveaway is not ended!**');
                } else {
                    console.error(e);
                    message.channel.send('<:no:833101993668771842> **An error occured...**```' + String(e.message).substr(0, 1900) + "```");
                }
            });


    } else if (args[0].toLowerCase() === "edit") {
        args.shift();
        let messageID = args[0];
        if (!messageID) {
            return message.channel.send(`<:no:833101993668771842> **You have to specify a valid messageID! Usage: \`${prefix}giveaway edit <ID> <PRIZE>\`**`);
        }
        let giveawayPrize = args.slice(1).join(' ');
        if (!giveawayPrize) {
            return message.channel.send(`<:no:833101993668771842> **You have to specify a valid prize! Usage: \`${prefix}giveaway edit <ID> <PRIZE>\`**`);
        }
        client.giveawaysManager.edit(messageID, {
            newWinnerCount: 3,
            newPrize: giveawayPrize,
            addTime: 5000
        }).then(() => {
            // here, we can calculate the time after which we are sure that the lib will update the giveaway
            const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
            message.channel.send('✅ ✅ Success! Giveaway will updated in less than ' + numberOfSecondsMax + ' seconds.**');
        }).catch((err) => {
            message.channel.send('<:no:833101993668771842> **No giveaway found for ' + messageID + ', please check and try again**');
        });
    } else if (args[0].toLowerCase() === "delete") {
        args.shift();
        let messageID = args[0];
        if (!messageID) {
            return message.channel.send(`<:no:833101993668771842> Y**ou have to specify a valid messageID! Usage: \`${prefix}giveaway delete <ID>\`**`);
        }
        client.giveawaysManager.delete(messageID).then(() => {
                message.channel.send('✅ **Success! Giveaway deleted!**');
            })
            .catch((err) => {
                message.channel.send('<:no:833101993668771842> **No giveaway found for ' + messageID + ', please check and try again**');
            });
    } else if (args[0].toLowerCase() === "list") {
        args.shift();
        if (!args[0]) return message.reply(`<:no:833101993668771842> **You did not enter a valid Parameter! Usage: \`${prefix}giveaway list <all/server>\`**`)
        if (args[0].toLowerCase() === "server") {
            let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id && !g.ended);
            let embed = new Discord.MessageEmbed().setColor("BLUE").setTitle("All not ended Giveaways!")
            buffer = "";
            for (let i = 0; i < onServer.length; i++) {
                let invite = await client.guilds.cache.get(onServer[i].guildID).channels.cache.first().createInvite();
                let CH = await client.guilds.cache.get(onServer.guildID).messages.fetch(onServer.messageID);
                buffer += `**>>** Prize: \`${onServer[i].prize}\` | Duration: \`${ms(new Date() - onServer[0].startAt)}\`\n | [\`JUMP TO IT\`](https://discord.com/channels/${onServer.guildID}/${onServer.channelID}/${onServer.messageID})\n`
            }
            embed.setDescription(buffer ? buffer : "No Giveaways")
            message.channel.send(embed)
        } else {
            let allGiveaways = client.giveawaysManager.giveaways.filter((g) => !g.ended); // [ {Giveaway}, {Giveaway} ]
            let embed = new Discord.MessageEmbed().setColor("BLUE").setTitle("All GLOBALLY not ended Giveaways!")
            buffer = "";
            for (let i = 0; i < allGiveaways.length; i++) {
                try{
                let invite = await client.guilds.cache.get(allGiveaways[i].guildID).channels.cache.first().createInvite();
                buffer += `**>>** Guild: [\`${client.guilds.cache.get(allGiveaways[i].guildID).name}\`](${invite}) | Prize: \`${allGiveaways[i].prize}\` | Duration: \`${ms(new Date() - allGiveaways[i].startAt)}\` | [\`JUMP TO IT\`](https://discord.com/channels/${allGiveaways[i].guildID}/${allGiveaways[i].channelID}/${allGiveaways[i].messageID})\n\n`
            }catch{}
            }
            embed.setDescription(buffer ? buffer : "No Giveaways")
            message.channel.send(embed)
        }
    } else {
        return message.reply(`PLEASE USE A VALID PARAMETER!\n\`${prefix}giveaway start\` -- *Starts a giveaway (follow the Steps)*\n\n\`${prefix}giveaway end <Giveaway_Id>\` -- *Ends a Giveaway*\n\n\`${prefix}giveaway edit <Giveaway_Id> <PRIZE>\` -- *Edits a Giveaway's Prize*\n\n\`${prefix}giveaway reroll <Giveaway_Id>\` -- *Rerolls an ended Giveaway*\n\n\`${prefix}giveaway list <server/all>\` -- *Lists all global / Server based Giveaways*`)
    }
  }
});

/**
 * 
 * 
 * 
 * 
 * THIS DOWN THERE IS VERY IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!
 * 
 * 
 * 
 */
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: require("../botconfig/embed.json").color,
        reaction: '🎉',
        messages: {
            giveaway: '🎉 **GIVEAWAY** 🎉',
            giveawayEnded: '🎉 **GIVEAWAY ENDED** 🎉',
            timeRemaining: 'Time remaining: **{duration}**!',
            inviteToParticipate: 'React with 🎉 to participate!',
            winMessage: 'Congratulations, {winners}!\n\n> You won **{prize}**!\n\n{messageURL}',
            embedFooter: 'Giveaway',
            noWinner: 'Giveaway cancelled, no valid participations.',
            hostedBy: 'Hosted by: {user}',
            winners: 'Winner(s)',
            endedAt: 'Ended at',
            units: {
                seconds: 'Seconds',
                minutes: 'Minutes',
                hours: 'Hours',
                days: 'Days',
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
