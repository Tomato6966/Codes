export const embedLimits = {
    title: 256,
    description: 4096,
    fieldsAmount: 25,
    field: {
        amount: 25,
        name: 256,
        value: 1024
    },
    footer: {
        text: 2048
    },
    author: {
        name: 256
    },
    maxEmbedChars: 6000
}

/**
 * Get the embed char size of a array of embeds
 * @param {EmbedBuilder[]|EmbedBuilder} embeds 
 * @returns {number}
 */
export function getEmbedCharSize (embeds) {
    // title, description, field.name, field.value, footer.text, and author.name
    if(!Array.isArray(embeds)) embeds = [embeds];
    return embeds.map(e => (e.data?.title?.length||0)+(e.data?.description?.length||0)+(e.data?.footer?.text?.length||0)+(e.data?.author?.name?.length||0)+(e.data?.fields?.map?.(v => (v?.value?.length||0)+(v?.name?.length||0)).reduce((a,b) => a+b,0)||0)).reduce((a,b) => a+b,0);
}

/**
 * @typedef {{ channel: import("discord.js").TextBasedChannel, debugLogs?: boolean, minThreshholdInMs?: number, maxThreshholdInMs?: number, checkerFunction?: () => boolean }} MivatorMessagerQueueOptions 
 */
export class MivatorMessagerQueue {
    /**
     * Add Message Contents, so it's a queue of contents available with auto resetting thresholds
     * @param {MivatorMessagerQueueOptions} options 
     */
    constructor(options = {}) {
        /** @private */
        this.maxEmbeds = 10;
        /** @private */
        this.maxThreshholdInMs = options.maxThreshholdInMs ?? 5000;
        /** @private */
        this.minThreshholdInMs = options.minThreshholdInMs ?? 500;
        /** @private */
        this.threshhold = options.minThreshholdInMs;
        /** @private */
        this.debugLogs = options.debugLogs ?? false;
        /** @private */
        this.checkerFunction = options.checkerFunction;
        /** @private @type {import("discord.js").TextBasedChannel} */
        this.channel = options.channel;
        /** @private @type {{time:number, messageData:import("discord.js").MessageCreateOptions}[]}*/
        this.queue = [];
        /** @private */
        this.lastAction = null;
        /** @private */
        this.timeout = null;
    }
    /**
     * Add a Sending Query, everything is supported!
     * @param {import("discord.js").MessageCreateOptions[] | import("discord.js").MessageCreateOptions} messageData 
     */
    addMessageData(messageData) {
        this.queue.push(...(Array.isArray(messageData) ? messageData : [messageData]).map(messageData => ({time: Date.now(), messageData})))
        if(this.checkQueueToSend()) return this.sendQueue();
        this.setTimeout();
        return;
    }
    /** @private */
    setTimeout() {
        return this.timeout = setTimeout(() => this.sendQueue(), this.threshhold);
    }
    /** @private */
    checkQueueToSend() {
        if(this.queue.flatMap(v => v.messageData?.files || []).length > 10) return true;
        if(this.queue.length >= this.maxEmbeds) return true;
        if(getEmbedCharSize(this.queue.map(v => v.messageData.embeds).filter(Boolean)) >= embedLimits.maxEmbedChars) return true;
        if(this.queue.map(v => v.messageData.content).filter(Boolean).reduce((a,b) => a+b,0) >= 1000) return true;
        return false;
    }
    /** @private */
    clearTimeout() {
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = null;
        return;
    }
    /** @private */
    async sendQueue() {
        this.threshhold += 150;
        this.clearTimeout();

        const check = this.checkerFunction ? await this.checkerFunction() : true;
        if(!check) {
            if(this.debugLogs) console.log("MESSAGE-SENDING-QUEUE - Cleared Sender Queue, due to checker failed");
            return this.queue.splice(0, this.queue.length);
        }
        
        const toSend = [...this.queue].sort((a,b) => a.time - b.time);
        const removed = [];
       
        while(getEmbedCharSize(toSend.flatMap(v => v.messageData.embeds).filter(Boolean)) > embedLimits.maxEmbedChars) {
            removed.push(toSend.splice(toSend.length - 1, 1));
            if(removed.length === 0) break;
        }
        while(toSend.map(v => v.messageData.content ? `${v.messageData.content}\n` : "").filter(Boolean).reduce((a,b) => a+b,0) > 1000) {
            removed.push(toSend.splice(toSend.length - 1, 1));
            if(removed.length === 0) break;
        }
        while(toSend.flatMap(v => v.messageData?.files || []).length > 10) {
            removed.push(toSend.splice(toSend.length - 1, 1));
            if(removed.length === 0) break;
        }
        if(!toSend.length) {
            if(this.debugLogs) console.error("MESSAGE-SENDING-QUEUE - No valid embeds available");
            return this.queue.splice(0, this.queue.length);
        }
        const delay = Date.now() - this.lastAction;

        if(delay < this.minThreshholdInMs) {
            if(this.debugLogs) console.error("MESSAGE-SENDING-QUEUE - Last action was WAY too quick? HOW? (quicker than mnthreshhold)");
            return this.setTimeout();
        }

        // reset threshold
        if(delay > this.maxThreshholdInMs) {
            this.threshhold = this.minThreshholdInMs;
            if(this.debugLogs) console.log("MESSAGE-SENDING-QUEUE - Resetting threshhold, due to long time-span in between")
        }

        this.lastAction = Date.now();
        
        await this.channel.send({
            content: toSend.map(v => v.messageData.content ? `${v.messageData.content}\n` : "").filter(Boolean).reduce((a,b) => a+b,""),
            embeds: [...toSend.flatMap(v => v.messageData.embeds).filter(Boolean)],
            allowedMentions: {
                roles: [...toSend.map(v => v.messageData?.allowedMentions?.roles).filter(Boolean)],
                users: [...toSend.map(v => v.messageData?.allowedMentions?.users).filter(Boolean)],
                parse: [...toSend.map(v => v.messageData?.allowedMentions?.parse).filter(Boolean)].filter((v, i, a) => i === a.findIndex(y => y === v))
            }
        }).catch(console.error);
        
        this.queue.splice(0, this.queue.length);

        if(removed.length) this.addEmbed(...removed);

        return;
    }
}
