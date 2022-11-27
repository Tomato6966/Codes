import { WebhookClient, EmbedBuilder, resolveColor } from "discord.js";
 
const getters = {
    clientId: () => process.env.CLIENTID,
    clientName: () => process.env.BOTNAME,
    errorWebhookUrl: () => process.env.ERRORWEBHOOK,
}
 
function getClusterId(manager = true) {
    const str = process.env.CLUSTER;
    const d = str && (str !== undefined || str !== "undefined") ? str : undefined;
    if(!isNaN(d) || d === 0) return str
    return manager ? "Manager" : undefined;
}
function getClusterStr() {
    return `${`Cluster-`.yellow}${`#${getClusterId()}`.yellow.bold}`;
}
function getTimeStr() {
    const [main, ms] = getTime().split(".")
    const [hh,mm,ss] = main.split(":");
    return `${`${hh}`.blue.dim}:${`${mm}`.blue}:${`${ss}`.blue}.${`${ms}`.blue.dim}`;
}
export class MilratoLogger {
    /**
     * 
     * @param {{prefix?: string, compact?:boolean}} options 
     */
    constructor(options={}) {
        this.compact = options.compact ?? false;
        this.space = ` [::] `.white;
        this.tilde = " ~ ".magenta.bold;
        this.emoji = {
            bot: "🤖",
            cluster: "💻",
        }
        this.levels = {
            info:    "Info   ".cyan,
            log:     "Log    ".white,
            debug:   "Debug  ".gray,
            success: "Success".green.bold,
            warn:    "Warn   ".yellow,
            table:   "Table  ".green,
            shards:  "Shard  ".yellow,
            error:   "Error  ".red.bold,
        }
        this.prefix = options?.prefix ? `${options?.prefix} `.blue + this.space : ``;
        this.errorWebhookClient = getters.errorWebhookUrl() ? new WebhookClient({
            url: getters.errorWebhookUrl()
        }) : false;
    }
    log(...text) {
        if(!this.compact) {
            return console.log(
                `┌${this.emoji.bot} ${this.prefix}${this.levels.log} ${this.emoji.cluster} ${getClusterStr()}${this.tilde}${getTimeStr()}\n└❯ `, 
                ...text
            );
        }
        return console.log(
            `${getTimeStr()}${this.space}${this.prefix}${this.levels.log}${this.tilde}${getClusterStr()}:`, 
            ...text
        );
    }
    info(...text) {
        if(!this.compact) {
            return console.log(
                `┌${this.emoji.bot} ${this.prefix}${this.levels.info} ${this.emoji.cluster} ${getClusterStr()}${this.tilde}${getTimeStr()}\n└❯ `, 
                ...text
            );
        }
        return console.log(
            `${getTimeStr()}${this.space}${this.prefix}${this.levels.info}${this.tilde}${getClusterStr()}:`, 
            ...text
        );
    }
    debug(...text) {
        if(!this.compact) {
            return console.log(
                `┌${this.emoji.bot} ${this.prefix}${this.levels.debug} ${this.emoji.cluster} ${getClusterStr()}${this.tilde}${getTimeStr()}\n└❯ `, 
                ...text.map(t => `${t}`.dim)
            );
        }
        return console.log(
            `${getTimeStr()}${this.space}${this.prefix}${this.levels.debug}${this.tilde}${getClusterStr()}:`,
            ...text.map(t => `${t}`.dim)
        );
    }
    success(...text) {
        if(!this.compact) {
            return console.log(
                `┌${this.emoji.bot} ${this.prefix}${this.levels.success} ${this.emoji.cluster} ${getClusterStr()}${this.tilde}${getTimeStr()}\n└❯ `, 
                ...text
            );
        }
        return console.log(
            `${getTimeStr()}${this.space}${this.prefix}${this.levels.success}${this.tilde}${getClusterStr()}:`,
            ...text
        );
    }
    warn(...text) {
        if(!this.compact) {
            return console.warn(
                `┌${this.emoji.bot} ${this.prefix}${this.levels.warn} ${this.emoji.cluster} ${getClusterStr()}${this.tilde}${getTimeStr()}\n└❯ `, 
                ...text
            );
        }
        return console.warn(
            `${getTimeStr()}${this.space}${this.prefix}${this.levels.warn}${this.tilde}${getClusterStr()}:`,
            ...text
        );
    }
    error(...errs) {
        const [err] = errs;
        if(!isNaN(Number(getClusterId())) && this.errorWebhookClient) {
            this.errorWebhookClient.send({
                content: `<t:${msUnix()}:F> | <t:${msUnix()}:R> | <@${getters.clientId()}>`,
                username: `MILRATO ERRORS - ${getters.clientName() || getters.clientId()}`,
                avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png',
                embeds: [
                    new EmbedBuilder().setColor(resolveColor("#ff0000"))
                    .setTitle(`New Error Occurred`)
                    .addField(`Cluster: `, `> ${getClusterId()}`)
                    .setDescription(`\`\`\`\n${String(err.stack ? err.stack : err.detail ? err.detail : err).substring(0, 2000)}\n\`\`\``)
                ],
            }).catch(() => null);
        }
        if(!this.compact) {
            return console.error(
                `┌${this.emoji.bot} ${this.prefix}${this.levels.error} ${this.emoji.cluster} ${getClusterStr()}${this.tilde}${getTimeStr()}\n└❯ `, 
                ...errs
            );
        }
        return console.error(
            `${getTimeStr()}${this.space}${this.prefix}${this.levels.error}${this.tilde}${getClusterStr()}:`,
            ...errs
        );
    }
    pure(...text) {
        return console.log(...text)
    }
    pureDim(...text) {
        return console.log(...text.map(x => `${x}`.dim))
    }
    shard(eventName, ...text) {
        if(!isNaN(Number(getClusterId())) && this.errorWebhookClient) {
            this.errorWebhookClient.send({
                content: `<t:${msUnix()}:F> | <t:${msUnix()}:R>`,
                username: 'MILRATO SHARDS',
                avatarURL: 'https://cdn.discordapp.com/emojis/996084564114026526.png',
                embeds: [
                    new EmbedBuilder().setColor(resolveColor("#00ff00"))
                    .setTitle(`New Shard Event - ${eventName}`)
                    .addField(`Cluster: `, `> ${getClusterId()}`)
                    .setDescription(`\`\`\`\n${text.join("\n").substring(0, 2000)}\n\`\`\``)
                ],
            }).catch(() => null);
        }
        if(!this.compact) {
            return console.warn(
                `┌${this.emoji.bot} ${this.prefix}${this.levels.warn} ${this.emoji.cluster} ${getClusterStr()}${this.tilde}${getTimeStr()}\n└❯ `, 
                ...text
            );
        }
        return console.warn(
            `${getTimeStr()}${this.space}${this.prefix}${this.levels.shards}${this.tilde}${getClusterStr()}:`,
            ...text
        );
    }
    table(data) {
        if(!this.compact) {
            console.log(
                `┌${this.emoji.bot} ${this.prefix}${this.levels.table} ${this.emoji.cluster} ${getClusterStr()}${this.tilde}${getTimeStr()}\n└❯ `, 
            );
            return console.table(data);
        }
        console.log(`${getTimeStr()}${this.space}${this.prefix}${this.levels.table}${this.tilde}${getClusterStr()}:`)
        return console.table(data);
    }
    custom(key, ...text) {
        return console.log(
            `${getTimeStr()}${this.space}${this.prefix}${key}${this.tilde}${getClusterStr()}:`,
            ...text
        );
    }
} 

function getTime(timestamp = Date.now()) {
    const d = new Date(timestamp);
    return `${formatDoubleDigit(d?.getHours())}:${formatDoubleDigit(d?.getMinutes())}:${formatDoubleDigit(d?.getSeconds())}.${formatTripleDigit(d?.getMilliseconds())}`
};
function msUnix(...numbers) {
    if(!numbers?.length) numbers.push(Date.now());
    return Math.ceil(numbers.reduce((a, b) => a+b, 0) / 1000);
} 
function formatDoubleDigit(t) {
    return parseInt(t) < 10 ? `0${t}` : `${t}`
};
function formatTripleDigit(t) {
    return parseInt(t) < 100 ? `0${formatDoubleDigit(t)}` : `${t}`
}
