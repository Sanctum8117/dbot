const { VolumeInterface } = require('discord.js');
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');
const client = require('../../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rewind")
    .setDescription("Go back seconds in a song.")
    .addIntegerOption(option =>
        option.setName("seconds")
        .setDescription("Time in seconds to go back. (10 = 10s)")
        .setMinValue(0)
        .setRequired(true)
    )
  .setDMPermission(false),
        
    async run(interaction){
        const { member, guild, options } = interaction;
        const seconds = options.getInteger("seconds");
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if(!voiceChannel){
            embed.setColor("Red").setDescription("You must be on a voice channel to execute music commands.");
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }
        if(!member.voice.channelId == guild.members.me.voice.channelId){
            embed.setColor("Red").setDescription(`You cannot use the music player as it is already active in ${guild.members.me.voice.channelId}.`);
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

        try{
            const queue = await client.distube.getQueue(voiceChannel);
                    
            if(!queue){
                embed.setColor("Red").setDescription("There is no active queue.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
            
            await queue.seek(queue.currentTime - seconds);
            embed.setColor("Orange").setDescription(`⏪ The music has been rewinded by ${seconds} seconds.`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Something went wrong...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}