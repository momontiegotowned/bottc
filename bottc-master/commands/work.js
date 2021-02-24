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

    let logsCoin = bot.channels.cache.get('711554230661677056');

    let timeout = 14400000;
    let reward = 200;

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
                work: Date.now(),
            })

            newData.save().catch(err => console.log(err));
            return message.channel.send({embed:{color:'a20a28', description:`**${message.author.tag}** has ${reward} <:ttcchips:715103658601218088>`}});
        } else {
            if(timeout - (Date.now() - data.work) > 0){
                let time = ms(timeout - (Date.now() - data.work));

                return message.channel.send({embed:{color:'a20a28', description:`**You already collected your wages. Work again in ${time.hours}h ${time.minutes}m**`}});
            } else {
                data.money +=reward;
                data.work = Date.now();
                data.save().catch(err => console.log(err));

                message.channel.send({embed:{color:'a20a28', description:`**You worked hard here's your pay check! ${reward} <:ttcchips:715103658601218088>**`}});
                dblogs.send({embed:{color:'a20a28', description:`**${message.author.username} worked hard here is the pay check! ${reward} <:ttcchips:715103658601218088>**`}});
                return;
            }
        }
    })
}

module.exports.help = {
    name:"work",
    aliases:["w"]
}