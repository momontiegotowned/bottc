const Discord =require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");
const assert = require("assert");
//Connect to database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology: true
});

// MODELS
const Data = require("../models/data.js");


module.exports.run = async (bot, message, args) =>{
    //let logsCoin = bot.channels.cache.get('711554230661677056');
    //let admin = bot.users.cache.get('323473522179571712');
    //let dblogs = bot.channels.cache.get('728490481813553224');
    
    let dblogs = bot.channels.cache.get('772401083384856596');
    
    if(!message.member.roles.cache.get('759070501871681574')) {

        return message.channel.send({embed:{color:'a20a28', description:"**You don't have the permission to this command**"}});

    }
    
    let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
    if(!user) return message.channel.send({embed:{color:'a20a28', description:"**Sorry, couldn't find that user.**"}});


    Data.findOne({
        userID: user.id
    }, (err, userData) =>{
        if(err) console.log(err);
        if(userData)
        {
            let thisUser = message.author.tag;
            Data.findOneAndUpdate({userID:message.author.id},{name:thisUser}).then(function(){
                Data.findOne({userID:message.author.id}).then(function(result){
                assert(result.name === thisUser)
                dblogs.send(`${thisUser} name was updated to the database`)
                return;
                })
            });
        }

        if(!args[1]) return message.channel.send({embed:{color:'a20a28', description:"**Please specify the ammount you want to pay**"}});

        if(args[1] != Math.floor(args[1])) return message.channel.send({embed:{color:'a20a28',description:"**OOPS! YOU CAN'T PAY WITH LETTERS :P**"}});

        if(parseInt(args[1]) < 10) return message.channel.send({embed:{color:'a20a28', description:"You cannot pay less than 10 <:ttcchips:715103658601218088>"}});

        if(!userData) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).tag,
                userID: message.author.id,
                lb:"all",
                money: parseInt(args[1]),
                daily: 0,
            })
            newData.save().catch(err => console.log(err));
        } else {
            userData.money += parseInt(args[1]);
            userData.save().catch(err => console.log(err));
        }
        
        message.channel.send({embed:{color:'a20a28', description:`**${message.author.username}** gives ${args[1]}<:ttcchips:715103658601218088> to **${bot.users.cache.get(user.id).tag}**`}});
        dblogs.send({embed:{color:'a20a28', description:`**${message.author.username}** gives ${args[1]}<:ttcchips:715103658601218088> to **${bot.users.cache.get(user.id).tag}**`}});
        return;

    })
}

module.exports.help = {
    name:"give",
    aliases:["g"]
}