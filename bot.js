const botconfig = require("./config.json");
const discord = require("discord.js");
const googleIt = require("google-it");
var {saveJson} = require("./savejson.js")


const bot = new discord.Client({disableEveryone: true});


bot.on("ready", async () => {
    console.log(`${bot.user.username} bot is online`);
    bot.user.setActivity("GSearch", {type: "LISTENING"});
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm")
        return;
    
        let prefix = botconfig.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice[0];

        if(cmd === `${prefix}hey`){
            return message.channel.send("Hi");
        }
        else if(cmd === `${prefix}Gsearch`){
            message.channel.send("What do you want to search?\n(type \"!abort\" to abort the search.)");
            let filter = m => m.author.id === message.author.id;
            let collected = await message.channel.awaitMessages(filter, {max: 1});
            var query = collected.first().content;
            console.log(query);


            if(collected.first().content === `${prefix}abort`){
                return message.channel.send("Seach aborted.");
            }

            else{
                var queryingUser = message.author.username;
                saveJson(queryingUser, query)

                message.channel.send("Please wait...");
                googleIt({'query': `${query}`}).then((results) => {
                    console.log(results);
                    
                    message.channel.send("Showing top 5 results-");
                    for(var i=0; i<1; i++){
                        message.channel.send(results[i].title)
                        message.channel.send(results[i].link);
                    }
                }).catch((err) => {
                    message.channel.send("An error has occurred.");
                })
            }
        }
});

bot.login(botconfig.TOKEN);