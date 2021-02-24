const Discord =require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

//Connect to database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports.run = async (bot, message, args) =>{

        message.delete();
        message.channel.send({embed:{color:'a20a28', description:`** Please React <:verified:711282873302515752> to verify.**`}});

    
}

module.exports.help = {
    name:"verify",
    aliases:["v"]
}