// FOR CLIENT
const client = new Client(...);
// codes...

// import ShardClientUtil somewhere, either on top or on bottom, doesn't really matter, but it must be in this file!
// Typescript / ESM: import { ShardClientUtil } from "discord.js";
const { ShardClientUtil } = require("discord.js");
/**
 * Get the ClusterId based of the ShardId
 * @param {number} shardId
 * @return {number} ClusterId
 */
client.clusterIdOfShardId = (shardId) => {
    if(typeof shardId === "undefined" || typeof shardId !== "number" || isNaN(shardId)) throw new Error("No valid ShardId Provided")
    if(Number(shardId) > client.cluster.info.TOTAL_SHARDS) throw new Error("Provided ShardId, is bigger than all Shard Ids");
    const middlePart = Number(shardId) === 0 ? 0 : Number(shardId) / Math.ceil(client.cluster.info.TOTAL_SHARDS / client.cluster.info.CLUSTER_COUNT);
    return Number(shardId) === 0 ? 0 : (Math.ceil(middlePart) - (middlePart % 1 !== 0 ? 1 : 0));
}
/**
 * Get the ClusterId based of the GuildId
 * @param {number} guildId
 * @return {number} ClusterId
 */
client.clusterIdOfGuildId = (guildId) => {
    if(!guildId || !/^(?<id>\d{17,20})$/.test(guildId)) throw new Error("Provided GuildId, is not a valid GuildId");
    return client.clusterIdOfShardId(client.shardIdOfGuildId(guildId));
}
/**
 * Get the shardId based of the GuildId
 * @param {number} guildId
 * @return {number} ClusterId
 */
client.shardIdOfGuildId = (guildId) => {
    if(!guildId || !/^(?<id>\d{17,20})$/.test(guildId)) throw new Error("Provided GuildId, is not a valid GuildId");
    return ShardClientUtil.shardIdForGuildId(guildId, client.cluster.info.TOTAL_SHARDS);
}

/**
 * execute a script on a specific cluster, just if you have the Guild
 * @param {(client:any, context:unknown) => any} callBackFunction 
 * @param {number | { guildId: number, timeout: number }} guildId 
 * @param {{ timeout: number }} [options] optional hybrid options 
 * @returns {Promise<any>} broadcast of that callBackFunction
 */
client.evalOnGuild = async (callBackFunction, guildId, options={}) => {
    const guildID = typeof guildId === "string" ? guildId : typeof guildId === "object" ? guildId?.guildId : null;
    if(!guildID || !/^(?<id>\d{17,20})$/.test(guildID)) throw new Error("Provided GuildId, is not a valid GuildId");
    if(typeof options !== "object") throw new Error("Provided Options, must be an object!");
    // set the cluster
    options.cluster = client.clusterIdOfGuildId(guildID);
    
    // if guildId === options, than add the options to options, without having guildId or cluster in there.
    if(typeof guildId === "object") {
        for(const [k, v] of Object.entries(guildID)) {
            if(!["guildId", "cluster"].includes(k) && !options[k]) options[k] = v;
        }
    }

    return await client.cluster.broadcastEval(callBackFunction, options).then(v => v[0]);
} 











// ---- different File parts start below ----







// or for the Manager:

const manager = new Manager(...);
// codes...

// import ShardClientUtil somewhere, either on top or on bottom, doesn't really matter, but it must be in this file!
// Typescript / ESM: import { ShardClientUtil } from "discord.js";
const { ShardClientUtil } = require("discord.js");


/**
 * Get the ClusterId based of the ShardId
 * @param {number} shardId
 * @return {number} ClusterId
 */
manager.clusterIdOfShardId = (shardId) => {
    if(typeof shardId === "undefined" || typeof shardId !== "number" || isNaN(shardId)) throw new Error("No valid ShardId Provided")
    if(Number(shardId) > manager.totalShards) throw new Error("Provided ShardId, is bigger than all Shard Ids");
    const middlePart = Number(shardId) === 0 ? 0 : Number(shardId) / Math.ceil(manager.totalShards / manager.totalClusters);
    return Number(shardId) === 0 ? 0 : (Math.ceil(middlePart) - (middlePart % 1 !== 0 ? 1 : 0));
}
/**
 * Get the ClusterId based of the GuildId
 * @param {number} guildId
 * @return {number} ClusterId
 */
manager.clusterIdOfGuildId = (guildId) => {
    if(!guildId || !/^(?<id>\d{17,20})$/.test(guildId)) throw new Error("Provided GuildId, is not a valid GuildId");
    return manager.clusterIdOfShardId(manager.shardIdOfGuildId(guildId));
}
/**
 * Get the shardId based of the GuildId
 * @param {number} guildId
 * @return {number} ClusterId
 */
manager.shardIdOfGuildId = (guildId) => {
    if(!guildId || !/^(?<id>\d{17,20})$/.test(guildId)) throw new Error("Provided GuildId, is not a valid GuildId");
    return ShardClientUtil.shardIdForGuildId(guildId, manager.cluster.totalShards);
}
/**
 * execute a script on a specific cluster, just if you have the Guild
 * @param {(client:any, context:unknown) => any} callBackFunction 
 * @param {number | { guildId: number, timeout: number }} guildId 
 * @param {{ timeout: number }} [options] optional hybrid options 
 * @returns {Promise<any>} broadcast of that callBackFunction
 */
manager.evalOnGuild = async (callBackFunction, guildId, options={}) => {
    const guildID = typeof guildId === "string" ? guildId : typeof guildId === "object" ? guildId?.guildId : null;
    if(!guildID || !/^(?<id>\d{17,20})$/.test(guildID)) throw new Error("Provided GuildId, is not a valid GuildId");
    if(typeof options !== "object") throw new Error("Provided Options, must be an object!");
    // set the cluster
    options.cluster = manager.clusterIdOfGuildId(guildID);
    // if guildId === options, than add the options to options, without having guildId or cluster in there.
    if(typeof guildId === "object") {
        for(const [k, v] of Object.entries(guildID)) {
            if(!["guildId", "cluster"].includes(k) && !options[k]) options[k] = v;
        }
    }
    return await manager.broadcastEval(callBackFunction, options).then(v => v[0]);
} 
