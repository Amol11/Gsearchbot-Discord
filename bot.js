const botconfig = require("./config.json");
const discord = require("discord.js");
const {search} = require("./functions/search.js");
const {recent} = require("./functions/recent.js");

const bot = new discord.Client({disableEveryone: true});


bot.on("ready", async () => {
    console.log(`${bot.user.username} bot is online`);
    bot.user.setActivity("!help", {type: "LISTENING"});
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm")
        return;
    
        let prefix = process.env.prefix;
        let greetings = ['Gsearch bot at your service', 'Gsearch bot is here to the rescue', 'you ought to use this bot', 'I\'m definitely an official bot *winks*', 'kept you waiting, huh?', 'I\'m always on holidays on last 10 days of every month', 'What\'s cooking good loonking?', 'What da dog doing?'];
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        var queryingUser = message.author.username;
        switch(cmd){
            case `${prefix}hey`: return message.channel.send(`Hi ${queryingUser}, ${greetings[Math.floor(Math.random()*greetings.length)]}!`);
                    break;

            case `${prefix}search`: search(prefix, message);
                    break;

            case `${prefix}recent`: recent(prefix, message);
                    break;

            case `${prefix}help`: 
            message.channel.send(`Hello ${queryingUser}! I can fetch top 5 google results for your query and save your search history.`); 
            message.channel.send(`You can give me commands by typing-\n-"!hey"\n-"!search" to search.\n-"!recent" to view your search logs.`);
                    break;
        }

});

bot.login(process.env.TOKEN);