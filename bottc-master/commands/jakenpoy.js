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
});;

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) =>{

    if(message.channel.id != "772401499991965697" && message.channel.id != "772401715181518909" && message.channel.id != "772401742994079764" && message.channel.id != "772401769606021151" )
    {
        message.channel.send({embed:{color:'a20a28', description:`**Please Use <#${geChannel.toString()}> channel.**`}}); 
        return;
    }
    
    Data.findOne({
        userID: message.author.id
    },(err, data) => {
        if(err) console.log(err);
        if(data)
        {
            let thisUser = message.author.tag;
            Data.findOneAndUpdate({userID:message.author.id},{name:thisUser}).then(function(){
                Data.findOne({userID:message.author.id}).then(function(result){
                assert(result.name === thisUser)
                console.log(`${thisUser} name was updated to the database`)
                return;
                })
            });
        }
        if(!data){
            const newData = new Data({
                name: message.author.tag,
                userID: message.author.id,
                lb:"all",
                money: 0,
                daily: 0,
            })

            newData.save().catch(err => console.log(err));
            return message.channel.send({embed:{color:'a20a28',description:"you don't have that much <:ttcchips:715103658601218088>"}});
        } else {
            var award = 25;
            var talo = 20;

            if(args[0].toLowerCase() === "rock")
            {
                let chances = ["win","lose"];
                var pick = chances[Math.floor(Math.random() * chances.length )];

                if(pick == "lose"){
                    data.money -= talo;
                    data.save().catch(err => console.log(err));
                    message.channel.send({embed:{color:'a20a28',description:`📃 **You lose**`}});
                    return;
                }else{
                    data.money += award;
                data.save().catch(err => console.log(err));
                message.channel.send({embed:{color:'a20a28',description:`✂ **You win!. New balance: ${(data.money).toLocaleString()}** <:ttcchips:715103658601218088>`}});
                return;
                }
            }

            if(args[0].toLowerCase() === "paper")
            {
                let chances = ["win","lose"];
                var pick = chances[Math.floor(Math.random() * chances.length )];

                if(pick == "lose"){
                    data.money -= talo;
                    data.save().catch(err => console.log(err));
                    message.channel.send({embed:{color:'a20a28',description:`✂ **You lose**`}});
                    return;
                }else{
                    data.money += award;
                data.save().catch(err => console.log(err));
                message.channel.send({embed:{color:'a20a28',description:`👊 **You win!. New balance: ${(data.money).toLocaleString()}** <:ttcchips:715103658601218088>`}});
                return;
                }
            }

            if(args[0].toLowerCase() === "scissor")
            {
                let chances = ["win","lose"];
                var pick = chances[Math.floor(Math.random() * chances.length )];

                if(pick == "lose"){
                    data.money -= talo;
                    data.save().catch(err => console.log(err));
                    message.channel.send({embed:{color:'a20a28',description:`👊 **You lose**`}});
                    return;
                }else{
                    data.money += award;
                data.save().catch(err => console.log(err));
                message.channel.send({embed:{color:'a20a28',description:`📃 **You win!. New balance: ${(data.money).toLocaleString()}** <:ttcchips:715103658601218088>`}});
                return;
                }
            }

            
        }
    })

    
}

module.exports.help = {
    name:"jakenpoy ",
    aliases:["jnp"]
}
