const googleIt = require("google-it");
const {saveJson} = require("./savejson.js");

var search = async (prefix, message) => {

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
            saveJson(queryingUser, query);

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

module.exports = {search};