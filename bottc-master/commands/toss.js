const Discord =require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

//Connect to database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports.run = async (bot, message, args) =>{
    let thisRole = message.mentions.roles.first();
    message.guild.members.fetch().then(members => {
    const users = members.filter(mmbr => mmbr.roles.cache.some(thisRole)).map(m => m.user.tag).join('\n')
    const embed = new Discord.MessageEmbed()
    .setDescription(users);
    message.channel.send(embed);
    })
    

}

module.exports.help = {
    name:"asdd",
    aliases:["asd"]
}