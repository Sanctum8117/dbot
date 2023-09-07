const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  run: async (client, message, args) => {
    const embed = new EmbedBuilder()
    let user = message.mentions.users.first() || message.member || message.author;
    if (!user) {embed.setColor("Orange").setDescription(`Please give me a valid user.`);
      return message.reply({ embeds: [embed] });}
    
    try {
        embed.setTitle("Avatar Command")
        embed.setDescription("Here is the user's avatar: ",)
        embed.setColor(0xFFE400)
        embed.setImage(user.displayAvatarURL({ dynamic: true }))
      return message.reply({ embeds: [embed] })
    } catch (err) {
      console.log(err);

      embed.setColor("Red").setDescription("⛔ | Something went wrong...");

      return message.reply({ embeds: [embed]});

    }
  }
};