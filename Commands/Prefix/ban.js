const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const slaver = process.env['id']


module.exports = {
  name: "ban",
  aliases: ["banish"],
  run: async (client, message, args) => {

    const say = message.content.split(" ")
    const content = say.slice(2).join(" ") || "No reason provided.";
    const embed = new EmbedBuilder()

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) {
      embed.setColor("Orange").setDescription(`You need to mention a user.`);
      return message.reply({ embeds: [embed] });
    }
    if ((!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) && (!message.author.id === slaver)) { 
       embed.setColor("Orange").setDescription(`You lack the required permissions.`);
      return message.reply({ embeds: [embed] });
   }
    if ((member.permissions.has(PermissionsBitField.Flags.BanMembers) || member.permissions.has(PermissionsBitField.Flags.BanMembers) || member.id === slaver) && (!message.author.id === slaver)) { 
      embed.setColor("Orange").setDescription(`This user seems to be a an admin/mod, I cannot do that action on them.`);
      return message.reply({ embeds: [embed] });
     }

    try {
      member.ban().then(() => {
        message.delete()

        embed.setTitle(`${member} was banned!`)
        embed.setDescription(`**Reason: **\n${content}`)
        embed.setColor(0xFF0000)
        message.author.send({ embeds: [embed] })
        return message.reply({ embeds: [embed] })
      })
    } catch (err) {
      console.log(err);

      embed.setColor("Red").setDescription("⛔ | Something went wrong...");

      return message.reply({ embeds: [embed] });

    }
  }
};