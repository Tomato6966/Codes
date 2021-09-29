const axios = require("axios");

let user = message.mentions.users.first() || message.author;

try {
  
  
  
  
    //HOW TO GET THE BANNER OF A USER
    const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
        headers: {
            Authorization: `Bot ${client.token}`
        }
    }).then(d => d.data);
    if(data.banner){
        let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
        message.channel.send(`**Banner of ${user.tag}**:\n> ${url}`)
    } else {
        message.channel.send(":x: **User has no Banner**")
    }

  
  
  
  
  
    //HOW TO GET CUSTOMAVATAR
    let member = message.guild.members.cache.get(user.id);
    if(!member) await message.guild.members.fetch(user.id).catch(e=>{ }) || false;
    if(member){
        const data = await axios.get(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then(d => d.data);
        if(data.avatar && data.avatar != user.avatar){
            let url = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
            url = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${user.id}/avatars/${data.avatar}${url}`;
            message.channel.send(`**CUSTOM AVATAR of ${user.tag}**:\n> ${url}`)
        } else {
            message.channel.send(":x: **User has no CUSTOM AVATAR**")
        }
    } else {
        message.channel.send(":x: **User has no CUSTOM AVATAR**")
    }
  
  
  
  
  
}catch(e){
    console.log(e)
}
