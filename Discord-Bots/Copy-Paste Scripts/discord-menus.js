//YOU SHOULD SOMEWHERE CREATE THIS BOT
const Discord = require("discord.js"); 
const client = new Discord.Client();
const dbs = require("discord-buttons");
dbs(client);
const { MessageMenuOption, MessageMenu } = require("discord-buttons")

//login to the bot
client.login("DISCORD BOT TOKEN")

client.on("ready", () => console.log("BOT IS ONLINE"));

//TUTORIAL
client.on("message", async message => {
    if(!message.guild || message.author.bot) return;

    const prefix = "!!"

    if(message.content == prefix + "ping") {
        message.reply("PONG")
    }    

    if (message.content == prefix + "menu") {
        let option1 = new MessageMenuOption()
        .setLabel("Option 1")
        .setValue("Option 1")
        .setDescription("This will give u the option 1")
        .setDefault()
        .setEmoji("😁")
        
        let option2 = new MessageMenuOption()
            .setLabel("Option 2")
            .setValue("Option 2")
            .setDescription("This will give u the option 2")
            .setDefault()
            .setEmoji("😄")
        let option3 = new MessageMenuOption()
            .setLabel("Option 3")
            .setValue("Option 3")
            .setDescription("This will give u the option 3")
            .setDefault()
            .setEmoji("🤩")
        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection! | POG")
            .addOptions(option1, option2, option3)
        
        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM").setTitle("SELECT NO!")

        let menumsg = await message.channel.send(embed, selection)

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "Option 1": 
                    menu.reply.send("the reply for option 1", true)
                break;
                case "Option 2": 
                    menu.reply.send("the reply for option 2", true)
                break;
                case "Option 3": 
                    menu.reply.send("the reply for option 3", true)
                break;
            }
        }

        client.on("clickMenu", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send(":x: you are not allowed to pick something", true)
            }
        })
    }
})


//MY VERSION - EXPENDABLE AUTOMATICALLY
client.on("message", async message => {
    //if not in a guild and not !menu
    if(!message.guild || !message.content.startsWith("!!menu") || message.author.bot) return;
    
    //COMMAND HANDLER FRIENDLY, just a REALLY BASIC example
    let cmduser = message.author;
    let menuoptions = [ 
      {
        value: "role1", description: "Get Role 1",
        replymsg: "This is the message for Role 1", emoji: "❌" //optional
      }, {
        value: "role2",  description: "Get Role 2",
        replymsg: "This is the message for Role 2", emoji: "✅" //optional
      } , {
        value: "role3",  description: "Get Role 3",
        replymsg: "This is the message for Role 3", emoji: "✅" //optional
      } , {
        value: "role4",  description: "Get Role 4",
        replymsg: "This is the message for Role 4", emoji: "✅" //optional
      } , {
        value: "role5",  description: "Get Role 5",
        replymsg: "This is the message for Role 5", emoji: "✅" //optional
      } 
    ]
    //define the selection
    let Selection = new MessageMenu()
      .setID('MenuSelection') 
      .setMaxValues(1) //OPTIONAL, this is how many values you can have at each selection
      .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
      .setPlaceholder('Click me to make a Selection!');  //message in the content placeholder
    menuoptions.forEach(option => {
      let row = new MessageMenuOption()
        .setLabel(option.label ? option.label : option.value)
        .setValue(option.value) 
        .setDescription(option.description) 
        .setDefault() 
      if(option.emoji) row.setEmoji(option.emoji) 
      Selection.addOption(row)
    })
    //define the embed
    let MenuEmbed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor("Bot Help", client.user.displayAvatarURL())
      .setDescription("***Select what you need in the `Selection` down Below!***")
    //send the menu msg
    let menumsg = await message.channel.send(MenuEmbed, Selection)
    //function to handle the menuselection
    function menuselection(menu) {
      let menuoptiondata = menuoptions.find(v=>v.value == menu.values[0])
      menu.reply.send(menuoptiondata.replymsg, true);
    }
    //Event
    client.on('clickMenu', (menu) => {
      if (menu.message.id === menumsg.id) {
        if (menu.clicker.user.id === cmduser.id) menuselection(menu);
        else menu.reply.send(`:x: You are not allowed to do that! Only: <@${cmduser.id}>`, true);
      }
    });
  })
