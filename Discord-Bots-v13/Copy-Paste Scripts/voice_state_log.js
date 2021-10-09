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

//SECOND OPTION IS OPTIMISED JUST FOR THE JOIN AND LEAVE AND SWITCHING: 
  client.on("voiceStateUpdate", (oldState, newState) => {
    let usertag = newState.member.user.tag;
      if (
      (!oldState.streaming === false && newState.streaming === true)   ||
      (oldState.streaming === true && !newState.streaming === false)   ||
      (!oldState.serverDeaf === false && newState.serverDeaf === true) ||
      (oldState.serverDeaf === true && !newState.serverDeaf === false) ||
      (!oldState.serverMute === false && newState.serverMute === true) ||
      (oldState.serverMute === true && !newState.serverMute === false) || 
      (!oldState.selfDeaf === false && newState.selfDeaf === true)     ||
      (oldState.selfDeaf === true && !newState.selfDeaf === false)     ||
      (!oldState.selfMute === false && newState.selfMute === true)     ||
      (oldState.selfMute === true && !newState.selfMute === false)     ||
      (!oldState.selfVideo === false && newState.selfVideo === true)   ||
      (oldState.selfVideo === true && !newState.selfVideo === false) 
   ) return;
    if (!oldState.channelID && newState.channelID) {

        return console.log(`${usertag} joined: ${newState.channel.name}`);
    }
    if (oldState.channelID && !newState.channelID) {

        return console.log(`${usertag} left: ${oldState.channel.name}`);
    }
    if (oldState.channelID && newState.channelID) {
        return console.log(`${usertag} switched from: ${oldState.channel.name} to: ${newState.channel.name}`);
    }
  });
