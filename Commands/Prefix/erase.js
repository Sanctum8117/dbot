const { EmbedBuilder, PermissionsBitField, ChatInputCommandInteraction} = require("discord.js");
const slaver = process.env['id']

module.exports = {
  name: "erase",
  aliases: ["purge","delete"],
  run: async (client, message, args) => {
    const embed = new EmbedBuilder();
    try{
      if ((!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) && (!message.author.id === slaver)) { 
       embed.setColor("Orange").setDescription(`You lack the required permissions.`);
      return message.reply({ embeds: [embed] });
   }
      let numberDeleted = (message instanceof ChatInputCommandInteraction) ? message.options.getNumber("number") : args[0];

        if (isNaN(numberDeleted)) {
          embed.setColor("Orange").setDescription(`Please send a number to delete not a word.`);
          return message.reply({ embeds: [embed] });}

        if (numberDeleted > 99) {
          embed.setColor("Orange").setDescription(`Can't delete over 100 messages at one time because of API`);
          return message.reply({ embeds: [embed] });}
        if (numberDeleted <= 0) {
          embed.setColor("Orange").setDescription(`You cannot delete nothingness.`);
          return message.reply({ embeds: [embed] });}
      numberDeleted++;
      await message.channel.bulkDelete(numberDeleted).then(() => {
        numberDeleted--;
                (message instanceof ChatInputCommandInteraction) ? (embed.setColor("Green").setDescription(`Successfully deleted ${numberDeleted} messages`)) : (embed.setColor("Green").setDescription(`Successfully deleted ${numberDeleted} messages`));
            });
      return message.channel.send({ embeds: [embed]});
    } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Something went wrong...");

            return message.reply({ embeds: [embed]});
  }
  }
};