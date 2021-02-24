const Discord =require("discord.js");

module.exports.run = async (bot, message, args) =>{


    let embed = new Discord.MessageEmbed();
        embed.setTitle("BOT COMMANDS");
        embed.setColor("a20a28");
        embed.addFields(
            { name: '**c.bal**', value: 'Check Balance.', inline: true },
            { name: '**c.pay**', value: 'Pay to other user.', inline: true },
            { name: '**c.roll**', value: 'To Gamble.', inline: true },
            { name: '**c.work**', value: 'Gives you 200 coins every 4 hours.', inline: true },
            { name: '**c.daily**', value: 'Gives you 500 every 24 Hours.', inline: true },
        )

        message.channel.send(embed);
}

module.exports.help = {
    name:"help",
    aliases:["tulong"]
}
