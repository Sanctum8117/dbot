
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = require('../../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Shows options for the loop command.")
    .addStringOption(option =>
        option.setName("options")
        .setDescription("Loop options: off, music, queue")
        .addChoices(
            { name: "off", value: "off" },
            { name: "music", value: "music" },
            { name: "queue", value: "queue" },
        )
        .setRequired(true)
    )
  .setDMPermission(false),
        
    async run(interaction){
        const { member, guild, options } = interaction;
        const option = options.getString("options");
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
            
            let mode = null;
            switch(option){
                case "off":
                    mode = 0;
                    break;
                case "music":
                    mode = 1;
                    break;
                case "queue":
                    mode = 2;
                    break;
            }
            
            mode = await queue.setRepeatMode(mode);

            mode = mode? (mode === 2? "Repeat queue" : "Repeat a song") : "Off";

            embed.setColor("Orange").setDescription(`🔁 Repeat mode set to \`${mode}\`.`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Something went wrong...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}