//INDEX.JS DATEI
//First Import The Modules/Files + Create the Client
const Discord = require('discord.js'); //v12
const config = require("./config.json");
const client = new Discord.Client();

//Then Code a Function to manage the SlashCommands
const SlashCommandsApp = (guild) => {
    const app = client.api.applications(client.user.id)
    if (guild) app.guilds(guild)
    return app;
}

//Ready Event + Loading the Slash Commands
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //Register All Slash Commands for a specific Guild
    for (const configData of config.slashcommands) {
        await SlashCommandsApp("OPTIONAL: GUILDID (just the ID, or leave blank!)").commands.post({
            data: configData
        });
        console.log(`✓ Loaded the SlashCommand ${configData.name}`)
    }
});

//Everytime an Interaction (We use it for SLASH COMMAND) is made, this event is fired
client.ws.on("INTERACTION_CREATE", async (interaction) => {
    try {
        if (interaction && interaction.type && interaction.type == 3) return;
        if (interaction && interaction.author && interaction.author.bot) return;
        if (!interaction || !interaction.data || !interaction.data.name) return;
        //get the command
        let cmd = interaction.data.name.toLowerCase();
        //function for sending data
        let send = async (inter, responseData) => {
            try {
                let data = {
                    content: responseData
                };
                //if there is an embed,change the data so it stil lworks
                if (typeof responseData === "object") data = await createApiMessage(inter, responseData)
                //if invalid interaction or no callback, return
                if (!client.api.interactions(inter.id, inter.token) || !client.api.interactions(inter.id, inter.token).callback) return;
                //send the message
                return client.api.interactions(inter.id, inter.token).callback.post({
                    data: {
                        type: 4,
                        data
                    }
                }).catch((e) => {
                    console.log("DOUBLE POSTING ERROR CATHING: ", e)
                });
            } catch (e) {
                console.log(e)
                return false;
            }
        }
        //function for sending embedded messages
        let createApiMessage = async (interaction, content) => {
            //destructure the properties from the APImEssage
            const {
                data,
                files
            } = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content).resolveData().resolveFiles()
            //return the destructured object
            return {
                ...data,
                files
            };
        }
        //Respond with the right Command
        switch (cmd) {
            case "discord":
                send(interaction, "https://discord.gg/milrato");
                break;
            case "help":
                send(interaction, new Discord.MessageEmbed().setColor("BLURPLE").setAuthor("My Commands", client.user.displayAvatarURL()).setDescription(`I am using SLASH COMMANDS, so please just type "/" and hover on my Avatar!`));
                break;
            case "ping":
                send(interaction, `:ping_pong: **PONG! Api Ping is: \`${client.ws.ping}ms\`**`);
                break;
        }
    } catch (e) {
        console.log(e.stack ? e.stack : e)
    }
})

//Finally Login to the bot
client.login(config.token);