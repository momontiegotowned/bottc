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

   // let logsCoin = bot.channels.cache.get('711554230661677056');
    let dblogs = bot.channels.cache.get('772401083384856596');

    let geChannel = "772401499991965697";
    if(message.channel.id != "701993773554597929")
    if(message.channel.id != "772401499991965697" && message.channel.id != "772401715181518909" && message.channel.id != "772401742994079764" && message.channel.id != "772401769606021151" )
    {
        message.channel.send({embed:{color:'a20a28', description:`**Please Use <#${geChannel.toString()}> channel.**`}}); 
        return;
    }
    
    let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
    if(!user) return message.channel.send({embed:{color:'a20a28', description:"**Sorry, couldn't find that user.**"}});

    if(user.id === message.author.id) return message.channel.send({embed:{color:'a20a28', description:"**You can't pay yourself!**"}});


    Data.findOne({
        userID: message.author.id
    }, (err, authorData) =>{
        if(err) console.log(err);
        if(authorData)
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
        if(!authorData) {
            return message.channel.send({embed:{color:'a20a28', description:"**You dont have any <:ttcchips:715103658601218088> to send. **"}});
        } else {
            Data.findOne({
                userID: user.id
            }, (err, userData) =>{
                if(err) console.log(err);

                if(!args[1]) return message.channel.send({embed:{color:'a20a28', description:"**Please specify the ammount you want to pay**"}});

                if(args[1] != Math.floor(args[1])) return message.channel.send({embed:{color:'a20a28',description:"**OOPS! YOU CAN'T PAY WITH LETTERS :P**"}});

                if(parseInt(args[1]) > authorData.money) return message.channel.send({embed:{color:'a20a28', description:"You do not have enough <:ttcchips:715103658601218088>"}});
                if(parseInt(args[1]) < 10) return message.channel.send({embed:{color:'a20a28', description:"You cannot pay less than 10 <:ttcchips:715103658601218088>"}});

                if(!userData) {
                    const newData = new Data({
                        name: bot.users.cache.get(user.id).tag,
                        userID: message.author.id,
                        lb:"all",
                        money: parseInt(args[1]),
                        daily: 0,
                    })
                    authorData.money -= parseInt(args[1]);
                    newData.save().catch(err => console.log(err));
                    authorData.save().catch(err => console.log(err));
                } else {
                    userData.money += parseInt(args[1]);
                    authorData.money -= parseInt(args[1]);
                    userData.save().catch(err => console.log(err));
                    authorData.save().catch(err => console.log(err));
                }
                
                message.channel.send({embed:{color:'a20a28', description:`**${message.author.username}** transferred ${args[1]}<:ttcchips:715103658601218088> to **${bot.users.cache.get(user.id).tag}**`}});
                dblogs.send({embed:{color:'a20a28', description:`**${message.author.username}** transferred ${args[1]}<:ttcchips:715103658601218088> to **${bot.users.cache.get(user.id).tag}**`}});
                return;

            })
        }
    })
}

module.exports.help = {
    name:"pay",
    aliases:["bayad"]
}