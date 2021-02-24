const Discord =require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");
const assert = require("assert");
const ms = require("parse-ms");
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
    if (message.channel.id != "772401499991965697" && message.channel.id != "772401715181518909" && message.channel.id != "772401742994079764" && message.channel.id != "772401769606021151") {
        message.channel.send({ embed: { color: 'a20a28', description: `**Please Use <#${geChannel.toString()}> channel.**` } });
        return;
    }

    let timeout = 86400000;
    let reward = 500;

    let logsCoin = bot.channels.cache.get('711554230661677056');

    Data.findOne({
        userID: message.author.id
    },(err, data) => {
        if(err) console.log(err);
        /*if(data)
        {
            let thisUser = message.author.tag;
            Data.findOneAndUpdate({userID:message.author.id},{name:thisUser}).then(function(){
                Data.findOne({userID:message.author.id}).then(function(result){
                assert(result.name === thisUser)
                console.log(`${thisUser} name was updated to the database`)
                return;
                })
            });
        }*/
        if(!data) {
            const newData = new Data({
                name: message.author.tag,
                userID: message.author.id,
                lb:"all",
                money: reward,
                daily: Date.now(),
            })

            newData.save().catch(err => console.log(err));
            return message.channel.send({embed:{color:'a20a28', description:`**${message.author.tag}** has ${reward} <:coinns:715103658601218088>`}});
        } else {
            if(timeout - (Date.now() - data.daily) > 0){
                let time = ms(timeout - (Date.now() - data.daily));

                return message.channel.send({embed:{color:'a20a28', description:`**You already collected your daily reward! Collect again in ${time.hours}h ${time.minutes}m**`}});
            } else {
                data.money +=reward;
                data.daily = Date.now();
                data.save().catch(err => console.log(err));

                message.channel.send({embed:{color:'a20a28', description:`**You recieved ${reward} <:coinns:715103658601218088>**`}});
                dblogs.send({embed:{color:'a20a28', description:`**${message.author.username} recieved ${reward} <:coinns:715103658601218088>**`}});
                return;
            }
        }
    })
}

module.exports.help = {
    name:"daily",
    aliases:["araw"]
}