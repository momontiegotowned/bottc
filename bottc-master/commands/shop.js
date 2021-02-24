const Discord =require("discord.js");
const botconfig = require("../botconfig.json");





module.exports.run = async (bot, message, args) =>{
    const kolorete = "798145159145455636";
    const tribo = "798145163217338409";
    const bayani = "798145164223840256";
    const barangay = "798145167285682186";
    const katangian = "798145167365505024";
    const kulay = "774903451112046622";
    
    let embed = new Discord.MessageEmbed();
        embed.setTitle("SHOP");
        embed.setColor("a20a28");
        embed.addFields(
            { name: '**1# 50,000<:ttcchips:715103658601218088>**', value: '50 LOAD', inline: true },
            { name: '**2# 75,000<:ttcchips:715103658601218088>**', value: '50 Gcash', inline: true },
            { name: '**3# 100,000<:ttcchips:715103658601218088>**', value: '100 LOAD', inline: true },
            { name: '**4# 150,000<:ttcchips:715103658601218088>**', value: '100 Gcash', inline: true },
            { name: '**5# 275,000 <:ttcchips:715103658601218088>**', value: '1 Month Nitro Classic', inline: true },
            { name: '**6# 550,000 <:ttcchips:715103658601218088>**', value: '1 Month Nitro Boost', inline: true },
            { name: '**7# 50,000<:ttcchips:715103658601218088>**', value: `<@&${kolorete}>`, inline: true },
            { name: '**8# 50,000<:ttcchips:715103658601218088>**', value: `<@&${tribo}>`, inline: true },
            { name: '**9# 50,000<:ttcchips:715103658601218088>**', value: `<@&${bayani}>`, inline: true },
            { name: '**10# 50,000<:ttcchips:715103658601218088>**', value: `<@&${barangay}>`, inline: true },
            { name: '**11# 50,000<:ttcchips:715103658601218088>**', value: `<@&${katangian}>`, inline: true },
            { name: '**12# 200,000<:ttcchips:715103658601218088>**', value: `<@&${kulay}>`, inline: true },
            {name :"\n\u200b",value :`to buy type **c.buy number of your choice ex.(c.buy 2 = 50 Gcash)**`},
        )
        message.channel.send(embed);
}


module.exports.help = {
    name:"shop",
    aliases:["shop"]
}
