const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js")
const fs = require("fs")

class Bot extends Client {
    constructor(options = {
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildScheduledEvents],
        partials: [Partials.Message, Partials.Reaction, Partials.Channel],
        fetchAllMembers: true,
        restTimeOffset: 1,
    }) {
        super(options);
        this.commands = new Collection();
        this.initCommand();
        this.initEvent();
        this.registerSlash();
        this.login("MTA0ODA1MDQ4NDM3MzYyNjg5MA.GBkWfr.WoFZ03mbgyUd98M0bywyNMdu3mLVDH43E8R3O4").catch(error => {
            console.error("An error occurred while connecting the bot : " + error);
            this.emit('error', error);
        });
    }

    initCommand() {
        let commandsSize = 0;
        fs.readdirSync('./commands/').filter(file => file.endsWith(".js")).forEach(file => {
            const command = require(`./commands/${file}`);
            this.commands.set(command.data.name, command);
            commandsSize++;
        });
        console.log(`Un total de ${commandsSize} commande${commandsSize > 1 ? "s" : ""} chargée${commandsSize > 1 ? "s" : ""}.`);
    }

    initEvent() {
        let eventsSize = 0;
        fs.readdirSync('./events/').filter(file => file.endsWith(".js")).forEach(file => {
            const event = require(`./events/${file}`);
            this.on(event.name, (...args) => event.run(this, ...args));
            eventsSize++;
        });
        console.log(`Un total de ${eventsSize} Evènement${eventsSize > 1 ? "s" : ""} chargé${eventsSize > 1 ? "s" : ""}.`);
    };

    registerSlash() {
        const { REST } = require("@discordjs/rest");
        const { Routes } = require("discord.js");
        const commands = [];

        fs.readdirSync('./commands/' ).filter(file => file.endsWith(".js")).forEach(file => {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
        });

        const rest = new REST({ version: "10" }).setToken("MTA0ODA1MDQ4NDM3MzYyNjg5MA.GBkWfr.WoFZ03mbgyUd98M0bywyNMdu3mLVDH43E8R3O4");

        rest.put(
            Routes.applicationCommands("1048050484373626890"), {
            body: commands
        }
        ).then(() => {
            console.log("Toutes les commandes on été mise à jour !")
        }).catch(err => {
            console.log(err)
        })
    }
}

exports.Bot = Bot;