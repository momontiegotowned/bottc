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
    let geChannel = "772401499991965697";
    let dblogs = bot.channels.cache.get('772401083384856596');
   // let dblogs = bot.channels.cache.get('728490481813553224');
    if(message.channel.id != "772401499991965697" && message.channel.id != "772401715181518909" && message.channel.id != "772401742994079764" && message.channel.id != "772401769606021151" )
    {
        message.channel.send({embed:{color:'a20a28', description:`**Please Use <#${geChannel.toString()}> channel.**`}}); 
        return;
    }

    if(!args[0]){
        var user = message.author;
    } else {
        var user = message.mentions.users.first() || bot.users.cache.get(args[0]);

    }
    Data.findOne({
        //name: message.author.tag,
        userID: user.id
    },(err, data) =>{
        if(err) console.log(err);
        if(data)
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
       /* else
        {
            let thisUser = message.author.tag;
            Data.findOneAndUpdate({name:thisUser},{userID:message.author.id}).then(function(){
                Data.findOne({name:thisUser}).then(function(result){
                assert(result.userID === message.author.id)
                message.channel.send(`${thisUser} name was updated to the database`)
                return;
                })
            });
        }*/

        if(!data) {
            const newData = new Data({
                name: message.author.tag,
                userID: message.author.id,
                lb:"all",
                //role: message.author.role.id,
                money: 0,
                daily: 0,
            })

            newData.save().catch(err => console.log(err));
            return message.channel.send({embed:{color:'a20a28', description:`**${bot.users.cache.get(user.id).tag}** has 0 <:ttcchips:715103658601218088>`}});
        } else {
            return message.channel.send({embed:{color:'a20a28', description:`**${bot.users.cache.get(user.id).tag}** has ${(data.money).toLocaleString()} <:ttcchips:715103658601218088>`}});
        }
    })
    
}

module.exports.help = {
    name:"balance",
    aliases:["bal" , "$"]
}
