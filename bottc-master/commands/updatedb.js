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
const { deleteOne } = require("../models/data.js");

module.exports.run = async (bot, message, args) =>{
    let list = bot.guilds.cache.get("333573514856628225"); 
    list.members.cache.forEach(member => {
        let allUsers = member.user.id
        let allUsersTag = member.user.tag
    console.log(allUsers);
    console.log(allUsersTag);

    let thisUser = message.author.tag;

    Data.findOneAndUpdate({name:thisUser},{name:thisUser}).then(function(){
        Data.findOne({userID:message.author.id}).then(function(result){
            assert(result.name === thisUser)
            message.channel.send(`${thisUser} name was updated to the database`)
            return;
        })
    })
})/*
    let thisUser = message.author.tag;
    Data.findOneAndUpdate({userID:message.author.id},{name:thisUser}).then(function(){
        Data.findOne({userID:message.author.id}).then(function(result){
            assert(result.name === thisUser)
            message.channel.send(`${thisUser} name was updated to the database`)
            return;
        })
    });*/
}

module.exports.help = {
    name:"update",
    aliases:[]
}