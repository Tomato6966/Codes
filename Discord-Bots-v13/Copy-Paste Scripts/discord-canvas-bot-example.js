const Discord = require("discord.js")
const Canvas = require("canvas");

const config = {
    "token": "PASTE YOUR TOKEN IN HERE",
    "prefix": "!!"
}

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
client.login(config.token);

client.on("ready", () => {
    console.log(`Logged in ${client.user.tag}`)
})


client.on("message", async (message) => {
    if(message.author.bot || !message.guild || !message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase()

    if(cmd == "image"){
        const user = message.mentions.users.first() || message.author;
      
        const canvas = Canvas.createCanvas(1000, 500)
        const ctx = canvas.getContext("2d");
      
        //draw the main background
        const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/849276102706331708/850289649154260992/unknown.png")
        ctx.drawImage(background, 0, 0, 1000, 500)
      
        //draw the second background which is a blacksquare 
        const background2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/849276102706331708/850290182280183818/unknown.png")
        ctx.globalAlpha  = 0.3; //changes the alpha before you draw the image
        ctx.drawImage(background2, 100, 100, 1000-200, 500-200)
      
        //change opacity again
        ctx.globalAlpha  = 1;
      
        // Draw the USER AVATAR
        const image = await Canvas.loadImage(user.displayAvatarURL({format: "png"}))
        ctx.drawImage(image, 50, 500/2 - 350/2, 350, 350)

      
        //WRITE THE USERNAME
        ctx.font = '75px Impact'
        ctx.fillStyle = "#FFFFF9"
        ctx.fillText(user.username, 420, 500/2 + 75/2)

        ctx.fillStyle = "#FFee00";

      
        //BACKGROUND OF THE BAR
        ctx.beginPath();
        ctx.moveTo(50, 450)
        ctx.lineTo(1000 - 50, 450)
        ctx.lineTo(1000 - 50, 455)
        ctx.lineTo(50, 455)
        ctx.closePath();
        ctx.fill()
        ctx.restore();
      
        //CHANGED THE FILL COLOR TO GREEN
        ctx.fillStyle = "#00FF00";
      
      
        //RANKING MATHS
        const points = 300;
        const neededpoints = 500;
        const percent = points/neededpoints;

      
        //DRAW THE BAR
        ctx.beginPath();
        ctx.moveTo(50, 450)
        ctx.lineTo((1000 - 50) * percent, 450)
        ctx.lineTo((1000 - 50) * percent, 455)
        ctx.lineTo(50, 455)
        ctx.closePath();
        ctx.fill()
        ctx.restore();

        //DRAWED THE RANKING POINTS
        ctx.font = '50px Impact'
        ctx.fillText(points + " / " + neededpoints, 50, 445)

        //ctx.drawImage(image, x, y, imagewidth, imagelength)
      
        //send the image as an attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "image-name.png")
        message.channel.send({content: `Rank of: ${user.tag}`, files: [attachment]})
    }
})


