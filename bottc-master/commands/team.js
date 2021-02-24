const Discord =require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

//Connect to database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const blue_ = "706065705774219274";
const red_ = "706963747146563625";
const yellow_ = "706963811642376232";
const green_ = "706963905175486464";

let blue_1 = "706065705774219274";
let red_1 = "706963747146563625";
let yellow_1 = "706963811642376232";
let green_1 = "706963905175486464";


module.exports.run = async (bot, message, args) =>{

    if(args[0].toLowerCase() == "blue"){

        message.member.roles.add(blue_);
        message.channel.send({embed:{color:'a20a28', description:`**${message.author.tag} You are in <@&${blue_}> Team**`}});
        return;
    }

    if(args[0].toLowerCase() == "red"){

        message.member.roles.add(red_);
        message.channel.send({embed:{color:'a20a28', description:`**${message.author.tag} You are in <@&${red_}> Team**`}});
        return;
    }

    if(args[0].toLowerCase() == "yellow"){

        message.member.roles.add(yellow_);
        message.channel.send({embed:{color:'a20a28', description:`**${message.author.tag} You are in <@&${yellow_}> Team**`}});
        return;
    }

    if(args[0].toLowerCase() == "green"){

        message.member.roles.add(green_);
        message.channel.send({embed:{color:'a20a28', description:`**${message.author.tag} You are in <@&${green_}> Team**`}});
        return;
    }

    
}

module.exports.help = {
    name:"team",
    aliases:["t"]
}