const { VolumeInterface } = require('discord.js');
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');
const client = require('../../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
        .setDescription("Play a song.")
        .addStringOption(option=>
                option.setName("search")
                    .setDescription("🔎 Enter a name or url for the song.")
                    .setRequired(true)
    )
  .setDMPermission(false),
    async run(interaction){
        const { options, member, guild, channel } = interaction;

        const query = options.getString("search");
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
            client.distube.play(voiceChannel, query, { textChannel: channel, member: member});
            return interaction.reply({ content: "🎶 Music has started"});
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Something went wrong...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}