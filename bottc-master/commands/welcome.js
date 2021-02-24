const Discord = require('discord.js');
const welcome = ("../welcome.json");

module.exports.run = async (bot, message, args) =>{
    let gifs = [
        "./tenor1.gif",
        "./tenor2.gif",
        "./tenor3.gif",
        "./tenor4.gif",
        "./tenor5.gif",
        "./tenor6.gif",
        "./tenor7.gif"
        
    ];

    var pick = gifs[Math.floor(Math.random() * gifs.length)];
    if(!args[0])
      return  message.channel.send("welcome!",{files: [`${pick}`]});
}

module.exports.help = {
    name:"welcome",
    aliases:["."]
}
