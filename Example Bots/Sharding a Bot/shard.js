//import the shardingmanager, from discord.js
const { ShardingManager } = require("discord.js");
//import the config file
const config = require("./config.json");
//call the file, where your old start file was usually its called index.js
const shards = new ShardingManager("./index.js", {
  token: "yourtoken", //paste your token in it
  totalShards: "auto", //auto will create automatic shard amount per ~1000-1500 guilds (split everytime 2500 guilds is reached)
    //you can also define the amount of shards you want, then it will force to shard ;) | MUST BE A NUMBER FOR EXAMPLE:
              // totalShards : 2,
});
//once a shard is created log information --> note this will start the bot in index.js for the amount of shards you have!
shards.on("shardCreate", shard => console.log(` || <==> || [${String(new Date).split(" ", 5).join(" ")}] || <==> || Launched Shard #${shard.id} || <==> ||`))
//spawn it
shards.spawn(shards.totalShards, 10000);
