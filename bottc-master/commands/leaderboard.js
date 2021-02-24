const Discord =require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

//Connect to database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) =>{
    let geChannel = "772401499991965697";

    if(message.channel.id != "772401499991965697" && message.channel.id != "772401715181518909" && message.channel.id != "772401742994079764" && message.channel.id != "772401769606021151" )
    {
        message.channel.send({embed:{color:'a20a28', description:`**Please Use <#${geChannel.toString()}> channel.**`}}); 
        return;
    }
    
    Data.find({
        lb:"all"
    }).sort([
        ['money', 'descending']
    ]).exec((err,res) =>{
        if(err) console.log(err);

        var page = Math.ceil(res.length / 10);

        let embed = new Discord.MessageEmbed();
        embed.setTitle("LEADERBOARD");
        embed.setColor("a20a28");

        let pg = parseInt(args[0]);
        if(pg !=Math.floor(pg)) pg = 1;
        if(!pg) pg = 1;
        let end = pg * 10;
        let start = (pg * 10) - 10;

        if(res.length === 0){
            embed.addField("Error", "No pages found!");
        } else if (res.length <= start){
            embed.addField("Error","Page not found!");
        } else if(res.length <= end){
            embed.setFooter(`page ${pg} of ${page}`);
            for(i = start; i < res.length; i++){
                embed.addField(`**${i + 1}. ${res[i].name}**` ,`<:coinns:715103658601218088> ${res[i].money.toLocaleString()}`);
                
            }
        } else{
            embed.setFooter(`page ${pg} of ${page}`);
            for(i = start; i< end; i++){
                embed.addField(`**${i + 1}. ${res[i].name}**` ,`<:coinns:715103658601218088> ${res[i].money.toLocaleString()}`);
            }
        }
        
        message.channel.send(embed);
    });
}

module.exports.help = {
    name:"lb",
    aliases:["board"]
}