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

    let role = message.mentions.roles.first() || bot.users.cache.get(args[0]);
    let memID = message.guild.roles.cache.get(role.id).members.map(m => m.user.id).join(' ').split(' ')

    if(!message.member.roles.cache.get('759070501871681574')) {

        return message.channel.send({embed:{color:'a20a28', description:"**You don't have the permission to this command**"}});

    }

    Data.find({
        userID: memID
    }).sort([
        ['money' , 'descending']
    ]).exec((err, res) =>{
        if (err) console.log(err)

        if(!args[1]) return message.channel.send({embed:{color:'a20a28', description:"**Please Specify Amount!**"}});
        if(args[1] != Math.floor(args[1])) return message.channel.send({embed:{color:'a20a28', description:"**Please Enter Whole numbers!**"}});

        if(!res) return message.channel.send({embed:{color:'a20a28', description:"**No role found!**"}});


        for (i = 0; i < res.length; i++)
            {
                Data.findOne({
                    userID:res[i].userID
                },(err , userData) =>{
                    if(err) console.log(err);
                    if(userData)
                    {
                        userData.money +=parseInt(args[1]);
                        userData.save().catch(err =>console.log(err));
                        console.log(userData.money);
                    }
                })
            }
            message.channel.send({embed:{color:'a20a28', description:`**${message.author.username} gives ${args[1]} <:coinns:715103658601218088> to ${role} with ${i} members**`}});
        })


}

module.exports.help = {
    name:"pr",
    aliases:["disableddddd"]
}
