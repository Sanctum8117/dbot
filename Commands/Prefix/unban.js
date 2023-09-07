const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const slaver = process.env['id']

module.exports = {
  name: "unban",
  aliases: ["ub"],
  run: async (client, message, args) => {

    const embed = new EmbedBuilder()
   
    if ((!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) && (!message.author.id === slaver))
{embed.setColor("Orange").setDescription(`You lack the required permissions.`);
      return message.reply({ embeds: [embed] });}
      

    if (!args[0])
      {embed.setColor("Orange").setDescription(`Please mention Member ID that you want to unban!`);
      return message.reply({ embeds: [embed] });}
        

    if (isNaN(args[0])) {embed.setColor("Orange").setDescription(`Please give me a valid Id`);
      return message.reply({ embeds: [embed] });}

    if (args[0] === message.author.id || args[0] === client.user.id)
    {embed.setColor("Yellow").setDescription(`Bruh, you know that Id is already unbanned.`);
      return message.reply({ embeds: [embed] });}

    let FetchBan = await message.guild.bans.fetch();

    let Member;
    Member =
      FetchBan.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      FetchBan.get(args[0]) ||
      FetchBan.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );

    if (!Member)
    {embed.setColor("Orange").setDescription(`Id is invalid or user is not banned.`);
      return message.reply({ embeds: [embed] });}

    let Reason = args.slice(1).join(" ") || "No reason provided.";

    try {
      message.guild.members.unban(Member.user.id, Reason);

      embed.setTitle(`${Member} was unbanned!`)
        embed.setDescription(`**Reason: **\n${Reason}`)
        embed.setColor(0xFF0000)
        message.author.send({ embeds: [embed] })
        return message.reply({ embeds: [embed] })
        
    } catch (err) {
      console.log(err);

      embed.setColor("Red").setDescription("⛔ | Something went wrong...");
    }
    return message.reply({ embeds: [embed] })
  }
};