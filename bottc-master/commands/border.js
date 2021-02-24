const Discord =require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");
const assert = require("assert");
const Canvas = require('canvas')
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

    try {
        const user = message.mentions.users.first() || bot.users.cache.get(args[0])
        if (user) {
            const canvas = Canvas.createCanvas(1024, 1024);
            const ctx = canvas.getContext('2d');

            // Pick up the pen
            ctx.beginPath();
            // Start the arc to form a circle
            ctx.arc(530, 525, 500, 0, Math.PI * 2, true)
            // Put the pen down
            ctx.closePath();
            // Clip off the region you drew on
            ctx.clip();

            const background = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg', size: 1024 }));
            ctx.drawImage(background, 38, 28, 1070, 1070);

            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            const avatar = await Canvas.loadImage('./thebrgy.png');
            ctx.drawImage(avatar, 6, 4, 1045, 1045);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'thebrgy.png');


            message.channel.send(attachment);
        }
        else {
            const canvas = Canvas.createCanvas(1024, 1024);
            const ctx = canvas.getContext('2d');

            // Pick up the pen
            ctx.beginPath();
            // Start the arc to form a circle
            ctx.arc(530, 525, 500, 0, Math.PI * 2, true);
            // Put the pen down
            ctx.closePath();
            // Clip off the region you drew on
            ctx.clip();

            const background = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg', size: 1024 }));
            ctx.drawImage(background, 38, 28, 1070, 1070);

            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            const avatar = await Canvas.loadImage('./thebrgy.png');
            ctx.drawImage(avatar, 6, 4, 1045, 1045);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'thebrgy.png');


            message.channel.send(attachment);
        }
    }
    catch (err) {
        message.channel.send({
            embed: {
                title: '❌ ERROR OCCURED',
                description: 'Oops! Seems like something went wrong here! \n\n\nThe error report has been sent to the developer!',
                color: 'FF0000',
                timestamp: new Date()
            }
        })
        bot.guilds.cache.get('575341681596039178').channels.cache.get('737842621925556227').send("ERROR ```" + err.stack + " ```")
    }

}

module.exports.help = {
    name:"pic",
    aliases:["border"]
}