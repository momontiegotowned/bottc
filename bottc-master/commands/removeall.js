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
    let logsCoin = bot.channels.cache.get('772401083384856596');
    
    if(!message.member.roles.cache.get('759070501871681574')) {

        return message.channel.send({embed:{color:'a20a28', description:"**You don't have the permission to this command**"}});

    }
    Data.find({
        lb: "all"
    }).sort([
        ['money', 'descending']
    ]).exec((err, res) => {
        if(err) console.log(err);

        //if(!args[0]) return message.send({embed:{color:'a20a28', description:"**Please Specify Amount!**"}});
        //if(args[0] != Math.floor(args[0])) return message.send({embed:{color:'a20a28', description:"**Please Enter Whole numbers!**"}});

        if(!res) return message.send({embed:{color:'a20a28', description:"**No users found!**"}});

        for(i=0; i< res.length; i++)
        {
            Data.findOne({
                userID: res[i].userID
            },(err, data) =>{
                if(err) console.log(err);
                if(data){
                    data.money = 0;
                    data.save().catch(err => console.log(err));
                }
                
            })
        }
        logsCoin.send({embed:{color:'a20a28', description:`**${message.author.username} removes <:ttcchips:715103658601218088> to everyone!**`}});
        message.channel.send({embed:{color:'a20a28', description:`**${message.author.username} removes${args[0]} <:ttcchips:715103658601218088> to everyone!**`}});
        return;
    })
  

}

module.exports.help = {
    name:"remove-all",
    aliases:[""]
}