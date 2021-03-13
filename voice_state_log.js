client.on("voiceStateUpdate", (oldState, newState) => {
    let usertag = newState.member.user.tag;
    if (!oldState.streaming && newState.streaming) return console.log(`${usertag} is ${newState.streaming ? "" : "not "}streaming`);
    if (oldState.streaming && !newState.streaming) return console.log(`${usertag} is ${newState.streaming ? "" : "not )"}streaming`);
    if (!oldState.serverDeaf && newState.serverDeaf) return console.log(`${usertag} is ${newState.serverDeaf ? "" : "un"}deafed (Server)`);
    if (oldState.serverDeaf && !newState.serverDeaf) return console.log(`${usertag} is ${newState.serverDeaf ? "" : "un"}deafed (Server)`);
    if (!oldState.serverMute && newState.serverMute) return console.log(`${usertag} is ${newState.serverMute ? "" : "un"}muted (Server)`);
    if (oldState.serverMute && !newState.serverMute) return console.log(`${usertag} is ${newState.serverMute ? "" : "un"}muted (Server)`);
    if (!oldState.selfDeaf && newState.selfDeaf) return console.log(`${usertag} is ${newState.selfDeaf ? "" : "un"}deafed (self)`);
    if (oldState.selfDeaf && !newState.selfDeaf) return console.log(`${usertag} is ${newState.selfDeaf ? "" : "un"}deafed (self)`);
    if (!oldState.selfMute && newState.selfMute) return console.log(`${usertag} is ${newState.selfMute ? "" : "un"}muted (self)`);
    if (oldState.selfMute && !newState.selfMute) return console.log(`${usertag} is ${newState.selfMute ? "" : "un"}muted (self)`);
    if (oldState.sessionID != newState.sessionID) return console.log(`${usertag} sessionID on: ${newState.sessionID}`);
    if (!oldState.selfVideo && newState.selfVideo) return console.log(`${usertag} is ${newState.selfVideo ? "" : "not "}self Video Sharing`);
    if (oldState.selfVideo && !newState.selfVideo) return console.log(`${usertag} is ${newState.selfVideo ? "" : "not "}self Video Sharing`);
    if (!oldState.channelID && newState.channelID) return console.log(`${usertag} joined: ${newState.channel.name}`);
    if (oldState.channelID && !newState.channelID) return console.log(`${usertag} left: ${oldState.channel.name}`);
    if (oldState.channelID && newState.channelID) return console.log(`${usertag} switched from: ${oldState.channel.name} to: ${newState.channel.name}`);
  });
