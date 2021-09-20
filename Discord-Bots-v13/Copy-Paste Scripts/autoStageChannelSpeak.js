client.on("voiceStateUpdate", (oldState, newState) => {
    if (
        (!oldState.streaming && newState.streaming) ||
        (oldState.streaming && !newState.streaming) ||
        (!oldState.serverDeaf && newState.serverDeaf) ||
        (oldState.serverDeaf && !newState.serverDeaf) ||
        (!oldState.serverMute && newState.serverMute) ||
        (oldState.serverMute && !newState.serverMute) ||
        (!oldState.selfDeaf && newState.selfDeaf) ||
        (oldState.selfDeaf && !newState.selfDeaf) ||
        (!oldState.selfMute && newState.selfMute) ||
        (oldState.selfMute && !newState.selfMute) ||
        (!oldState.selfVideo && newState.selfVideo) ||
        (oldState.selfVideo && !newState.selfVideo)
    ) return;
    if (!oldState.channelID && newState.channelID) {
        if(newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress){
            try{
                await newState.guild.me.voice.setSuppressed(false)
            }catch{

            }
        }
        return;
    }
    if (oldState.channelID && !newState.channelID) {
        return;
    }
    if (oldState.channelID && newState.channelID) {
        if(newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress){
            try{
                await newState.guild.me.voice.setSuppressed(false)
            }catch{

            }
        }
        return;
    }
});
