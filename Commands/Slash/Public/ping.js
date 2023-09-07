const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ascii = require('ascii-table');
const client = require('../../../index');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot.")
  .setDMPermission(false),

  async run(interaction) {
    const { options, member, guild, channel } = interaction;
    const embed = new EmbedBuilder();
    try {
      let totalSeconds = (client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      embed.setTitle("Bot Ping")
      embed.setDescription(`Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms. Bot Latency is ${Math.round(client.ws.ping)}ms\n\n**Uptime:** ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`,)
      embed.setColor("Green")
      interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (err) {
      console.log(err);

      embed.setColor("Red").setDescription("⛔ | Something went wrong...");

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
}