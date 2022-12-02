module.exports = {
    name: "interactionCreate",
    async run(client, interaction) {
        if (!interaction.guild) return;

        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.run(client, interaction);
            } catch (error) {
                console.log(error)
            }
        }
    }
}