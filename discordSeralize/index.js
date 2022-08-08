/*
    Example-Responses in: https://github.com/Tomato6966/Codes/tree/main/discordSeralize/examples
*/
function formatGuild (guild, minimal = true, stringify = false, mostMinimal = false) {
    if(!guild) return undefined;
    const obj = {};
    if(guild.id !== undefined) obj.id = guild.id;
    if(guild.name !== undefined) obj.name = guild.name;
    if(guild.ownerId !== undefined) obj.ownerId = guild.ownerId;
    if(mostMinimal) {
        if(guild.channels !== undefined) obj.channels = guild.channels?.cache?.map?.(s => formatChannel(s, minimal, stringify, mostMinimal));
        if(guild.roles !== undefined) obj.roles = guild.roles?.cache?.map?.(s => formatRole(s, minimal, stringify, mostMinimal));
        if(guild.members !== undefined) obj.members = guild.members?.cache?.map?.(s => formatMember(s, minimal, stringify, mostMinimal));
        if(guild.invites !== undefined) obj.invites = guild.invites?.cache?.map?.(s => formatInvite(s, minimal, stringify, mostMinimal)); 
        if(guild.bans !== undefined) obj.bans = guild.bans?.cache?.map?.(s => formatBan(s, minimal, stringify, mostMinimal));
        if(guild.icon !== undefined) obj.icon = guild.icon; 
        return stringify ? JSON.stringify(obj) : obj
    }
    if(guild.channels !== undefined) obj.channels = guild.channels?.cache?.map?.(s => formatChannel(s, minimal, stringify, mostMinimal));
    if(guild.roles !== undefined) obj.roles = guild.roles?.cache?.map?.(s => formatRole(s, minimal, stringify, mostMinimal));
    if(guild.members !== undefined) obj.members = guild.members?.cache?.map?.(s => formatMember(s, minimal, stringify, mostMinimal));
    if(guild.bans !== undefined) obj.bans = guild.bans?.cache?.map?.(s => formatBan(s, minimal, stringify, mostMinimal));
    if(guild.emojis !== undefined) obj.emojis = guild.emojis?.cache?.map?.(s => formatEmoji(s, minimal, stringify, mostMinimal));
    if(guild.invites !== undefined) obj.invites = guild.invites?.cache?.map?.(s => formatInvite(s, minimal, stringify, mostMinimal)); 
    if(guild.stickers !== undefined) obj.stickers = guild.stickers?.cache?.map?.(s => formatSticker(s, minimal, stringify, mostMinimal)); 
    if(guild.memberCount !== undefined) obj.memberCount = guild.memberCount; 
    if(guild.available !== undefined) obj.available = guild.available;
    if(guild.banner !== undefined) obj.banner = guild.banner;
    if(guild.icon !== undefined) obj.icon = guild.icon; 
    if(guild.shardId !== undefined) obj.shardId = guild.shardId; 
    if(guild.premiumTier !== undefined) obj.premiumTier = guild.premiumTier; 
    if(!minimal) {
        if(guild.afkChannelId !== undefined) obj.afkChannelId = guild.afkChannelId;
        if(guild.createdTimestamp !== undefined) obj.createdTimestamp = guild.createdTimestamp;
        if(guild.description !== undefined) obj.description = guild.description;
        if(guild.features !== undefined) obj.features = guild.features;
        if(guild.joinedTimestamp !== undefined) obj.joinedTimestamp = guild.joinedTimestamp; 
        if(guild.maximumBitrate !== undefined) obj.maximumBitrate = guild.maximumBitrate; 
        if(guild.maximumMembers !== undefined) obj.maximumMembers = guild.maximumMembers; 
        if(guild.mfaLevel !== undefined) obj.mfaLevel = guild.mfaLevel; 
        if(guild.nameAcronym !== undefined) obj.nameAcronym = guild.nameAcronym; 
        if(guild.nsfwLevel !== undefined) obj.nsfwLevel = guild.nsfwLevel; 
        if(guild.rulesChannelId !== undefined) obj.rulesChannelId = guild.rulesChannelId; 
        if(guild.vanityURLCode !== undefined) obj.vanityURLCode = guild.vanityURLCode; 
        if(guild.verificationLevel !== undefined) obj.verificationLevel = guild.verificationLevel; 
        if(guild.verified !== undefined) obj.verified = guild.verified; 
    }
    return stringify ? JSON.stringify(obj) : obj
}
function formatBan(ban, minimal = false, stringify = false, mostMinimal = false) {
    if(!ban) return undefined;
    if(mostMinimal) return ban?.user?.id;
    const obj = {};
    if(ban.guild !== undefined) obj.guildId = ban.guild?.id;
    if(ban.reason !== undefined) obj.reason = ban.reason;
    if(ban.user) {
        if(minimal) obj.user = user?.id; 
        else obj.user = formatUser(user);
    }
    return stringify ? JSON.stringify(obj) : obj
} 
function formatEmoji(emoji, minimal = false, stringify = false, mostMinimal = false) {
    if(!emoji) return undefined;
    const obj = {};
    
    if(emoji.animated !== undefined) obj.animated = emoji.animated;
    if(emoji.name !== undefined) obj.name = emoji.name;
    if(emoji.id !== undefined) obj.id = emoji.id;
    if(mostMinimal) return stringify ? JSON.stringify(obj) : obj;
    if(!minimal) {
        if(emoji.author !== undefined) obj.author = emoji.author;
        if(emoji.available !== undefined) obj.available = emoji.available;
        if(emoji.createdTimestamp !== undefined) obj.createdTimestamp = emoji.createdTimestamp;
        if(emoji.deleteable !== undefined) obj.deleteable = emoji.deleteable;
        if(emoji.identifier !== undefined) obj.identifier = emoji.identifier;
        if(emoji.managed !== undefined) obj.managed = emoji.managed;
        if(emoji.requiresColons !== undefined) obj.requiresColons = emoji.requiresColons;
        if(emoji.url !== undefined) obj.url = emoji.url;
        if(emoji.guild !== undefined) obj.guildId = emoji.guild?.id;
    }
    return stringify ? JSON.stringify(obj) : obj
}
// if(emoji.XYZTEMPLATE !== undefined) obj.XYZTEMPLATE = emoji.XYZTEMPLATE;
function formatInvite(invite, minimal = false, stringify = false, mostMinimal = false) {
    if(!invite) return undefined;
    if(mostMinimal) return invite.code;
    const obj = {};
    if(invite.code !== undefined) obj.code = invite.code;
    if(invite.uses !== undefined) obj.uses = invite.uses;
    if(invite.inviterId !== undefined) obj.inviterId = invite.inviterId;
    if(!minimal) {
        if(invite.channelId !== undefined) obj.channelId = invite.channelId;
        if(invite.maxUses !== undefined) obj.maxUses = invite.maxUses;
        if(invite.maxAge !== undefined) obj.maxAge = invite.maxAge;
        if(invite.url !== undefined) obj.url = invite.url;
        if(invite.targetUser !== undefined) obj.targetUser = formatUser(invite.targetUser, minimal, stringify, mostMinimal);
        if(invite.guild !== undefined) obj.guildId = invite.guild?.id;
        if(invite.gexpiresTimestampuild !== undefined) obj.expiresTimestamp = invite.expiresTimestamp;
        if(invite.createdTimestamp !== undefined) obj.createdTimestamp = invite.createdTimestamp;
    }
    return stringify ? JSON.stringify(obj) : obj
}
function formatSticker(sticker, minimal = false, stringify = false, mostMinimal = false) {
    if(!sticker) return undefined;
    if(mostMinimal) {
        if(sticker.url) return sticker.url;
        const obj = {};
        if(sticker.id !== undefined) obj.id = sticker.id;
        if(sticker.guildId !== undefined) obj.guildId = sticker.guildId;
        if(mostMinimal) return stringify ? JSON.stringify(obj) : obj;
    }
    const obj = {};
    if(sticker.id !== undefined) obj.id = sticker.id;
    if(sticker.name !== undefined) obj.name = sticker.name;
    if(sticker.packId !== undefined) obj.packId = sticker.packId;
    if(!minimal) {
        if(sticker.available !== undefined) obj.available = sticker.available;
        if(sticker.createdTimestamp !== undefined) obj.createdTimestamp = sticker.createdTimestamp;
        if(sticker.sortValue !== undefined) obj.sortValue = sticker.sortValue;
        if(sticker.tags !== undefined) obj.tags = sticker.tags;
        if(sticker.type !== undefined) obj.type = sticker.type;
        if(sticker.url !== undefined) obj.url = sticker.url;
        if(sticker.user !== undefined) obj.user = formatUser(sticker.user);
        if(sticker.format !== undefined) obj.format = sticker.format;
        if(sticker.description !== undefined) obj.description = sticker.description;
    } else {
        if(sticker.user !== undefined) obj.user = sticker.user?.id;
    }
    return stringify ? JSON.stringify(obj) : obj
}
function formatChannel(channel, minimal = false, stringify = false, mostMinimal = false) {
    if(!channel) return undefined;
    if(mostMinimal) return channel.id;
    const obj = {};
    if(channel.id !== undefined) obj.id = channel.id;
    if(channel.name !== undefined) obj.name = channel.name;
    if(channel.type !== undefined) obj.type = channel.type;
    if(channel.guildId !== undefined) obj.guildId = channel.guildId;
    if(channel.parentId !== undefined) obj.parentId = channel.parentId;
    if(channel.position !== undefined) obj.position = channel.position;
    if(!minimal) {
        if(channel.bitrate !== undefined) obj.bitrate = channel.bitrate;
        if(channel.createdTimestamp !== undefined) obj.createdTimestamp = channel.createdTimestamp;
        if(channel.full !== undefined) obj.full = channel.full;
        if(channel.speakable !== undefined) obj.speakable = channel.speakable;
        if(channel.viewable !== undefined) obj.viewable = channel.viewable;
        if(channel.userLimit !== undefined) obj.userLimit = channel.userLimit;
        if(channel.url !== undefined) obj.url = channel.url;
        if(channel.joinable !== undefined) obj.joinable = channel.joinable;
        if(channel.rawPosition !== undefined) obj.rawPosition = channel.rawPosition;
        if(channel.permissionOverwrites !== undefined) obj.permissionOverwrites = channel.permissionOverwrites?.cache?.map?.(s => formatOverwrites(s, minimal, stringify, mostMinimal));
        if(channel.rateLimitPerUser !== undefined) obj.rateLimitPerUser = channel.rateLimitPerUser;
        if(channel.deleteable !== undefined) obj.deleteable = channel.deleteable;
    }
    return stringify ? JSON.stringify(obj) : obj;
}
function formatRole(role, minimal = false, stringify = false, mostMinimal = false) {
    if(!role) return undefined;
    if(mostMinimal) return role.id;
    const obj = {};
    if(role.id !== undefined) obj.id = role.id;
    if(role.name !== undefined) obj.name = role.name;
    if(role.rawPosition !== undefined) obj.rawPosition = role.rawPosition;
    if(!minimal) {
        if(role.guild !== undefined) obj.guildId = role.guild?.id;
        if(role.position !== undefined) obj.position = role.position;
        if(role.color !== undefined) obj.color = role.color;
        if(role.hexColor !== undefined) obj.hexColor = role.hexColor;
        if(role.hoist !== undefined) obj.hoist = role.hoist;
        if(role.icon !== undefined) obj.icon = role.icon;
        if(role.managed !== undefined) obj.managed = role.managed;
        if(role.mentionable !== undefined) obj.mentionable = role.mentionable;
        if(role.permissions !== undefined) obj.permissions = role.permissions?.toArray?.();
        if(role.tags !== undefined) obj.tags = role.tags;
        if(role.createdTimestamp !== undefined) obj.createdTimestamp = role.createdTimestamp;
        if(role.editable !== undefined) obj.editable = role.editable;
        if(role.unicodeEmoji !== undefined) obj.unicodeEmoji = role.unicodeEmoji;
    }
    return stringify ? JSON.stringify(obj) : obj;
}
function formatMember(member, minimal = false, stringify = false, mostMinimal = false) {
    if(!member) return undefined;
    if(mostMinimal) return member.id;
    const obj = {};
    if(member.id !== undefined) obj.id = member.id;
    if(member.guild !== undefined) obj.guildId = member.guild?.id;
    if(member.permissions) obj.permissions = member.permissions?.toArray?.();
    if(!minimal) {
        if(member.avatar !== undefined) obj.avatar = member.avatar;
        if(member.communicationDisabledUntilTimestamp !== undefined) obj.communicationDisabledUntilTimestamp = member.communicationDisabledUntilTimestamp;
        if(member.joinedTimestamp !== undefined) obj.joinedTimestamp = member.joinedTimestamp;
        if(member.premiumSinceTimestamp !== undefined) obj.premiumSinceTimestamp = member.premiumSinceTimestamp;
        if(member.presence !== undefined) obj.presence = formatPresence({...member.presence});
        if(member.roles !== undefined) obj.roles = formatMemberRoles({...member.roles?.cache});
        if(member.user !== undefined) obj.user = formatUser({...member.user});
        if(member.voice !== undefined) obj.voice = formatVoiceState({...member.voice});
    } else {
        if(member.roles !== undefined) obj.roles = member.roles.cache.map(x => x?.id);
        if(member.voice !== undefined) obj.voice = { channelId : member.voice?.channelId };
        if(member.presence !== undefined) obj.presence = { status: member.presence?.status };
    }
    return stringify ? JSON.stringify(obj) : obj;
}
function formatPresence(presence, minimal = false, stringify = false, mostMinimal = false) {
    if(!presence) return undefined;
    if(mostMinimal) return presence?.status || "offline";
    const obj = {};
    if(presence.status !== undefined) obj.status = presence.status;
    if(presence.userId !== undefined) obj.userId = presence.userId;
    if(presence.guild !== undefined) obj.guildId = presence.guild?.id;
    if(presence.activities !== undefined) obj.activities = presence.activities;
    if(!minimal) {
        if(presence.clientStatus !== undefined) obj.clientStatus = presence.clientStatus;
    }
    return stringify ? JSON.stringify(obj) : obj;
}
function formatOverwrites(overwrite, minimal = false, stringify = false, mostMinimal = false) {
    if(!overwrite) return undefined;
    const { allow, deny, type, id } = overwrite;
    const obj = { allow, deny, type, id };
    return stringify ? JSON.stringify(obj) : obj;
}
function formatVoiceState(voiceState, minimal = false, stringify = false, mostMinimal = false) {
    if(!voiceState) return undefined;
    if(mostMinimal) return voiceState?.channelId;
    const obj = {};
    if(voiceState.channelId !== undefined) obj.channelId = voiceState.channelId;
    if(voiceState.id !== undefined) obj.id = voiceState.id;
    if(!minimal) {
        if(voiceState.deaf !== undefined) obj.deaf = voiceState.deaf;
        if(voiceState.guild !== undefined) obj.guildId = voiceState.guild?.id;
        if(voiceState.mute !== undefined) obj.mute = voiceState.mute;
        if(voiceState.requestToSpeakTimestamp !== undefined) obj.requestToSpeakTimestamp = voiceState.requestToSpeakTimestamp;
        if(voiceState.selfDeaf !== undefined) obj.selfDeaf = voiceState.selfDeaf;
        if(voiceState.selfMute !== undefined) obj.selfMute = voiceState.selfMute;
        if(voiceState.selfVideo !== undefined) obj.selfVideo = voiceState.selfVideo;
        if(voiceState.serverDeaf !== undefined) obj.serverDeaf = voiceState.serverDeaf;
        if(voiceState.serverMute !== undefined) obj.serverMute = voiceState.serverMute;
        if(voiceState.sessionId !== undefined) obj.sessionId = voiceState.sessionId;
        if(voiceState.streaming !== undefined) obj.streaming = voiceState.streaming;
        if(voiceState.suppress !== undefined) obj.suppress = voiceState.suppress;
    }
    return stringify ? JSON.stringify(obj) : obj;
}
function formatUser(user, minimal = false, stringify = false, mostMinimal = false) {
    if(!user) return undefined;
    if(mostMinimal) return user.id
    const obj = {};
    if(user.avatar !== undefined) obj.avatar = user.avatar;
    if(user.bot !== undefined) obj.bot = user.bot;
    if(user.discriminator !== undefined) obj.discriminator = user.discriminator;
    if(user.id !== undefined) obj.id = user.id;
    if(user.username !== undefined) obj.username = user.username;
    if(!minimal) {
        if(user.banner !== undefined) obj.banner = user.banner;
        if(user.createdTimestamp !== undefined) obj.createdTimestamp = user.createdTimestamp;
        if(user.defaultAvatarURL !== undefined) obj.defaultAvatarURL = user.defaultAvatarURL;
        if(user.flags !== undefined) obj.flags = user.flags;
        if(user.hexAccentColor !== undefined) obj.accentColor = user.accentColor;
        if(user.tag !== undefined) obj.tag = user.tag;
    }
    return stringify ? JSON.stringify(obj) : obj;
}
function formatMemberRoles(roleManager, minimal = false, stringify = false, mostMinimal = false) {
    if(!roleManager) return undefined;
    if(mostMinimal) return roleManager.cache?.map?.(r => r?.id);
    const obj = { };
    if(minimal) {
        if(roleManager.highest !== undefined) obj.highest = roleManager.highest?.id;
        if(roleManager.hoist !== undefined) obj.hoist = roleManager.hoist?.id;
        if(roleManager.cache !== undefined) obj.roles = roleManager.cache?.map?.(r => r?.id);
    } else {
        if(roleManager.highest !== undefined) obj.highest = formatRole(roleManager.highest, minimal, stringify, mostMinimal);
        if(roleManager.hoist !== undefined) obj.hoist = formatRole(roleManager.highest, minimal, stringify, mostMinimal);
        if(roleManager.cache !== undefined) obj.roles = roleManager.cache?.map?.(s => formatRole(s, minimal, stringify, mostMinimal));
    }
    return stringify ? JSON.stringify(obj) : obj;
}
module.exports = {
    formatGuild, formatBan, formatEmoji, formatInvite, formatSticker, formatChannel, formatRole, formatMember, formatPresence, formatOverwrites, formatVoiceState, formatUser, formatMemberRoles 
}
