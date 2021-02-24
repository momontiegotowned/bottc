const Discord =require("discord.js");
const botconfig = require("../botconfig.json");
const mongoose = require("mongoose");

//Connect to database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

    const kolorete = "798145159145455636";
    const tribo = "798145163217338409";
    const bayani = "798145164223840256";
    const barangay = "798145167285682186";
    const katangian = "798145167365505024";
    const kulay = "774903451112046622";

module.exports.run = async (bot, message, args) =>{

    const excutive = "759070502748422155";

    let dblogs = bot.channels.cache.get('772401083384856596');

    Data.findOne({
        userID: message.author.id
    },(err, data) => {
        if(err) console.log(err);
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

            var pipti_load = 50000;
            var pipti_gcash = 75000;
            var onehundred_load = 100000;
            var onehundred_gcash = 150000;
            var one_month_nitro = 275000;
            var one_month_boost = 550000;

            var kolorete_ = 50000;
            var tribo_ = 50000;
            var bayani_ = 50000;
            var barangay_ = 50000;
            var katangian_ = 50000;
            var kulay_ = 200000;
            
        }  
        
       if(args[0].toLowerCase() == "1")
        {
            if(data.money < pipti_load) {
            return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
            }else {
            data.money -= pipti_load;
            data.save().catch(err => console.log(err));
            dblogs.send(`${message.author} buy's 50 pesos load <@&${excutive}> please do your JOB :P`)
            message.channel.send({embed:{color:'a20a28', description:`**Congratulations you have 50 pesos load. Please DM <@&${excutive}>**`}});
            return;
            }
        }
        if(args[0].toLowerCase() == "2")
        {
            if(data.money < pipti_gcash){ 
                return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
            }else {
            data.money -= pipti_gcash;
            data.save().catch(err => console.log(err));
            dblogs.send(`${message.author} buy's 50 50 Gcash <@&${excutive}> please do your JOB :P`)
            message.channel.send({embed:{color:'a20a28', description:`**Congratulations you have 50 Gcash. Please DM <@&${excutive}>**`}})
            return;
            }
        }

        if(args[0].toLowerCase() == "3")
        {
            if(data.money < onehundred_load){
                 return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}})
            }else {
            data.money -= onehundred_load;
            data.save().catch(err => console.log(err));
            dblogs.send(`${message.author} buy's 100 load <@&${excutive}> please do your JOB :P`)
            message.channel.send({embed:{color:'a20a28', description:`**Congratulations you have 100 load. Please DM <@&${excutive}>**`}});
            return;
            }
        }
        if(args[0].toLowerCase() == "4")
        {
            if(data.money < onehundred_gcash){
                 return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
            }else {
            data.money -= onehundred_gcash;
            data.save().catch(err => console.log(err));
            dblogs.send(`${message.author} buy's 100 Gcash <@&${excutive}> please do your JOB :P`)
            message.channel.send({embed:{color:'a20a28', description:`**Congratulations you have 100 Gcash. Please DM <@&${excutive}>**`}})
            return;
            }
        }

        if(args[0].toLowerCase() == "5")
        {
            if(data.money < one_month_nitro){
             return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
            }else{
            data.money -= one_month_nitro;
            data.save().catch(err => console.log(err));
            dblogs.send(`${message.author} buy's 1 Month discord nitro <@&${excutive}> please do your JOB :P`)
            message.channel.send({embed:{color:'a20a28', description:`**Congratulations you have 1 Month discord nitro. Please DM <@&${excutive}>**`}});
            return;
            }
        }
        if(args[0].toLowerCase() == "6")
        {
            if(data.money < one_month_boost){
             return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
            }else {
                data.money -= one_month_boost;
                data.save().catch(err => console.log(err));
                dblogs.send(`${message.author} buy's 1 Month Nitro Boost <@&${excutive}> please do your JOB :P`)
                message.channel.send({embed:{color:'a20a28', description:`**Congratulations you have 1 Month Nitro Boost. Please DM <@&${excutive}>**`}})
                return;
                }
        }

        if(args[0].toLowerCase() == "7")
        {
            if(data.money < kolorete_){
                 return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
            }else{
                data.money -= kolorete_;
                data.save().catch(err => console.log(err));
                message.member.roles.add(kolorete);
                message.channel.send({embed:{color:'a20a28', description:`**Congratulations you claimed <@&${kolorete}>**`}});
                return;
                }
        }
        if(args[0].toLowerCase() == "8")
        {
            if(data.money < tribo_){
                 return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
            }else {
            data.money -= tribo_;
            data.save().catch(err => console.log(err));
            message.member.roles.add(tribo);
            message.channel.send({embed:{color:'a20a28', description:`**Congratulations you claimed <@&${tribo}>**`}})
            return;
            }
        }

        if(args[0].toLowerCase() == "9")
        {
            if(data.money < bayani_){
                 return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
                }else {   
                data.money -= bayani_;
                data.save().catch(err => console.log(err));
                message.member.roles.add(bayani);
                message.channel.send({embed:{color:'a20a28', description:`**Congratulations you claimed <@&${bayani}>**`}})
                return;
                }
        }
        if(args[0].toLowerCase() == "10")
        {
            if(data.money < barangay_){
                 return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
                }else{
                data.money -= barangay_;
                data.save().catch(err => console.log(err));
                message.member.roles.add(barangay);
                message.channel.send({embed:{color:'a20a28', description:`**Congratulations you claimed <@&${barangay}>**`}})
                return;
                }
        }

        if(args[0].toLowerCase() == "11")
        {
            if(data.money < katangian_ ){
                 return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
                }else{
                data.money -= katangian_;
                data.save().catch(err => console.log(err));
                message.member.roles.add(katangian);
                message.channel.send({embed:{color:'a20a28', description:`**Congratulations you claimed <@&${katangian}>**`}})
                return;
                }
        }

        if(args[0].toLowerCase() == "12")
        {
            if(data.money < kulay_){
                 return message.channel.send({embed:{color:'a20a28',description:"You don't have any money"}});
            }else{
            data.money -= kulay_;
            data.save().catch(err => console.log(err));
            message.member.roles.add(kulay);
            message.channel.send({embed:{color:'a20a28', description:`**Congratulations you claimed <@&${kulay}>**`}})
            return;
            }
        }

       
     })
}


module.exports.help = {
    name:"buy",
    aliases:["b"]
}
