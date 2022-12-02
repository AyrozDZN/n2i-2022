const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { v4 } = require('uuid');
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-articles')
        .setDescription('Ajoute un article sur le site')
        .setDMPermission(false)
        .addStringOption(option => option.setName('titre').setDescription('Le titre de l\'article').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('La description de l\'article').setRequired(true))
        .addStringOption(option => option.setName('image').setDescription('Lien de l\'image de l\'article').setRequired(true)),
    
    async run(client, interaction) {

        if (!interaction.options.getString('image').startsWith("https://") && !interaction.options.getString('image').startsWith("http://")) {
            interaction.reply({ content: "Lien de l'image invalide", ephemeral: true })
            return
        }

        const { MessageEmbed } = require('discord.js')
        const embed = new EmbedBuilder()
            .setTitle(interaction.options.getString('titre'))
            .setDescription(interaction.options.getString('description'))
            .setImage(interaction.options.getString('image'))
            .setFooter({ text: 'Article ajouté par ' + interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTimestamp()
        
        const articles = require('../articles.json')
        articles[v4()] = {image: interaction.options.getString('image'), title: interaction.options.getString('titre'), description: interaction.options.getString('description')};

        fs.writeFileSync(`./articles.json`, JSON.stringify(articles, null, 4), err => {
            if (err) throw err;
        });

        interaction.reply({ embeds: [embed] })
    }
}