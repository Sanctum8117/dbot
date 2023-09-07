const { EmbedBuilder, PermissionsBitField } = require("discord.js");


module.exports = {
  name: "whois",
  aliases: ["info"],
  run: async (client, message, args) => {

 
let target 
    if(message.mentions.users.first())
     {target = message.guild.members.cache.get(message.mentions.users.first().id)}
    
    else if(message.guild.members.cache.get(args[0]))
       {target =  message.guild.members.cache.get(args[0])}
    
    else
       {target = message.member}
    
            const embed = new EmbedBuilder()
    
    try{
        
        const permissions = target.permissions.toArray();
        const sortedPermissionsArray = permissions.sort();
        const formattedPermissions = sortedPermissionsArray.join(', ');
        const acknowledgements =  permissions.includes('Administrator') ? 'Administrator' : 'None';
      //permissions.includes('Administrator') ? 'Server Owner' : 'None' ||
        
        if (acknowledgements && acknowledgements.length > 1024) acknowledgements.slice(0, 10);
        if (formattedPermissions && formattedPermissions.length > 1024) formattedPermissions.slice(0, 10);
        
        if (formattedPermissions.length == 0) permissions.push("No key permissions found");
       
        if (target?.presence?.status === 'online') targetStatus = 'Online';
        if (target?.presence?.status === 'idle') targetStatus = 'Idle';
        if (target?.presence?.status === 'dnd') targetStatus = 'Do Not Disturb';
        if (!target?.presence?.status || target?.presence?.status === 'undefined') targetStatus = 'Offline';
        

            embed.setAuthor({ name: `${target?.user.tag}`, iconURL: target?.user.displayAvatarURL({ dynamic: true }) })
            embed.setThumbnail(`${target?.user.displayAvatarURL({ dynamic: true })}`)
            embed.addFields(
                { name: `Registered`, value: `<t:${parseInt(target?.user.createdTimestamp / 1000)}> \n*(<t:${parseInt(target?.user.createdTimestamp / 1000)}:R>)*`, inline: true },
                { name: `Joined`, value: `<t:${parseInt(target?.joinedTimestamp / 1000)}> \n*(<t:${parseInt(target?.joinedTimestamp / 1000)}:R>)*`, inline: true },
                { name: `Status`, value: `${targetStatus}`, inline: false },
                { name: `Acknowledgements`, value: `${acknowledgements}`, inline: false },
                { name: `Permissions`, value: `${formattedPermissions}`, inline: false })
            embed.setFooter({ text: target?.id })
            embed.setTimestamp()

        if (target?.user.bot) embed.addFields({ name: 'Additional:', value: `This user is a BOT`, inline: false });

      return message.reply({ embeds: [embed] })


    } catch (err) {
      console.log(err);

      embed.setColor("Red").setDescription("⛔ | Something went wrong...");
    }
        return message.reply({ embeds: [embed] })
  }
  };