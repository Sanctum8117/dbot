// console.log(path.resolve(__dirname, '..', 'Music'))
//console.log(path.resolve(__dirname, '..', 'Public'))
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ascii = require('ascii-table');
const client = require('../../../index');


module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
        .setDescription("View the list of commands.")
  .setDMPermission(false),

    async run(interaction){
        const { options, member, guild, channel } = interaction;
        const embed = new EmbedBuilder();
        try{
            
            embed.setColor("Yellow").setDescription(`**Sanctoram Commands** - ***Use / before every command*** \n
            \`play\` - ***Choose a song and enter a name or url for the song.***\n
            \`skip\` - ***Skip to the next song in the queue.***\n
            \`playing\` - ***See the song that is playing now.***\n
            \`queue\` - ***View the song queue.***\n
            \`forward\` - ***Advance in a song (in seconds).***\n
            \`loop\` - ***Shows options for the loop command.***\n
            \`rewind\` - ***Go back in the song of a song (in seconds)***\n
            \`shuffle\` - ***Activate shuffle mode.***\n
            \`stop\` - ***Stop bot activity.***\n
            \`volume\` - ***Change volume of music.***\n
            \`pause\` - ***Pause music.***\n
            \`resume\` - ***Resume music.***\n`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Something went wrong...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}