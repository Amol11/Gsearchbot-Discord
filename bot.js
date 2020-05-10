const botconfig = require("./config.json");
const discord = require("discord.js");
const {search} = require("./functions/search.js");
const {recent} = require("./functions/recent.js");

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

        switch(cmd){
            case `${prefix}hey`: return message.channel.send(`Hi ${message.author.username}!`);
                    break;

            case `${prefix}search`: search(prefix, message);
                    break;

            case `${prefix}recent`: recent(prefix, message);
                    break;
        }

});

bot.login(botconfig.TOKEN);