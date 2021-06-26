  client.on("voiceStateUpdate", async (oldState, newState) => {
    if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false)
        {
            try{
                var channel = newState.member.guild.channels.cache.find(
                    channel =>
                      channel.type === "text" &&
                      ( channel.name.toLowerCase().includes("cmd") ||channel.name.toLowerCase().includes("command") ||  channel.toLowerCase().name.includes("bot") ) &&
                      channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                  );
                  channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience")
                  newState.setDeaf(true);
            }catch (error) {
                try{
                    console.log("could not send info msg in a botchat")
                    var channel = newState.member.guild.channels.cache.find(
                        channel =>
                          channel.type === "text" &&
                          channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                      );
                      channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience")
                      newState.setDeaf(true);
                }catch (error) {
                  console.log("could not send info msg in a random chat")
                  newState.setDeaf(true);
                }
            }
    }
  });
