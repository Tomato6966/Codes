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
    function stateChange(one, two) {
        if(one === false && two === true || one === true && two === false) return true;
        else return false;
    }
    const o = oldState, n = newState; 
    if (stateChange(o.streaming, n.streaming) || stateChange(o.selfVideo, n.selfVideo) ||
      stateChange(o.serverDeaf, n.serverDeaf) || stateChange(o.serverMute, n.serverMute) || 
      stateChange(o.selfDeaf, n.selfDeaf) || stateChange(o.selfMute, n.selfMute)) return;
      
    if (!o.channelID && n.channelID) {
        return console.log(`${newState.member.user.tag} joined: ${newState.channel.name}`);
    }
    if (o.channelID && !n.channelID) {
        return console.log(`${newState.member.user.tag} left: ${oldState.channel.name}`);
    }
    if (o.channelID && n.channelID) {
        return console.log(`${newState.member.user.tag} switched from: ${oldState.channel.name} to: ${newState.channel.name}`);
    }
  });
