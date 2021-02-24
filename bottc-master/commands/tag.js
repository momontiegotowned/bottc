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
    
    /*    let list = bot.guilds.cache.get("333573514856628225"); 
        list.members.cache.forEach(member => {
        let allUsers = member.user.id
        const newData = new Data({
            name: allUsers,
            userID: allUsers,
            lb:"all",
            money: 0,
            daily: 0,
        })
        newData.save().catch(err => console.log(err));
        console.log(allUsers);});*/

        let thisUser = "staff";
            Data.findOneAndUpdate({userID:message.author.id},{lb:thisUser}).then(function(){
                Data.findOne({userID:message.author.id}).then(function(result){
                assert(result.lb === thisUser)
                console.log(`${thisUser} leader board updated to the db`);
                message.channel.send("done, thanks")
                return;
                })
            });



    }

module.exports.help = {
    name:"staff",
    aliases:["disableddddd"]
}