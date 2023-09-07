const { VolumeInterface } = require('discord.js');
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');
const client = require('../../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Change the volume of the bot.")
    .addIntegerOption(option=>
        option.setName("percentage")
            .setDescription("10 = 10%")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
    )
  .setDMPermission(false),
  
    async run(interaction){
        const { member, guild, options } = interaction;
        const voiceChannel = member.voice.channel;
        const volume = options.getInteger("percentage");
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

            client.distube.setVolume(voiceChannel, volume);
            return interaction.reply({ content: `🔉 Volume changed to ${volume}%.` });
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Something went wrong...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}