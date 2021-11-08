//Defining
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { Permissions } = require('discord.js')

//My Command Handler
module.exports = {
name: 'delchannel',
description: 'Deletes the chnanel in which the command ha Been ran'
category: 'Moderation',
//If u want to use my command handler, then watch this video: https://youtu.be/N8qaXGH6xII

run: async (client, message, args) => {
//Embeds
const MemberPerms = new MessageEmbed()
.setTitle('Missing Perms')
.setDescription('You need `MANAGE_CHANNEL` Permission to use this!')
.setColor('RED')
.setTimestamp()

const ClientPerms = new MessageEmbed()
.setTitle('Missing Perms')
.setDescription('I need `MANAGE_CHANNEL` Permission to do that!')
.setColor('RED')
.setTimestamp()

const confirmation = new MessageEmbed()
.setTitle('Are You sure?')
.setDescription('Are you sure that you want to delete this channel permanently?')
.setColor('YELLOW')

const deleted = new MessageEmbed()
.setTitle('Channel Deleted')
.setDescription ('Successfully deleted the channel')
.setColor('GREEN')
.setTimestamp()

const safe = new MessageEmbed()
.setTitle('Channel is safe')
.setDescription('Ok, so u chose no, now I will not delete this channel :)')
.setColor('GREEN')
.setTimestamp()

//Buttons
const row = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId('yes')
.setStyle('DANGER')
.setLabel('Yes')
)
.addComponents(
new MessageButton()
.setCustomId('no')
.setStyle('SUCCESS')
.setLabel('No')
)

const disabledRow = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId('yep')
.setStyle('DANGER')
.setLabel('Yes')
.sstDisabled(true)
)
.addComponents(
new MessageButton()
.setCustomId('nope')
.setStyle('SUCCESS')
.setLabel('No')
.setDisabled(true)
)

//Checking Perms
if(!message.member.permissions.has(Permission.FLAGS.MANAGE_CHANNELS)) return message.reply({embeds: [MemberPerms]})
If(!guild.me.permission.has(Permission.FLAGS.MANAGE_CHANNELS)) return message.reply({embeds: [ClientPerms]})

//Sending the main embed
const m = await message.reply({embeds: [confirmation], components: [row]})
setTimeout(function() => {
m.delete()
}, 15000)

//Making filter to ensure safety
const filter = i => i.user.id === message.author.id;

//Defining collector
const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 })

//Collecting buttons
collector.on('collect', async i => {
if(i.customId === 'yes') {
await message.author.send({embeds: [deleted]}) && message.channel.delete()
}

if(i.customId === 'no') {
await i.update({embeds: [safe], components: [disabledRow]})
}
})
}
}
