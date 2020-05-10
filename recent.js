const fs = require("fs");

var recent = async (prefix, message) => {
    message.channel.send("What do you want to search in recents?\n(type \"!abort\" to abort the search.)");
    let filter = m => m.author.id === message.author.id;
    let collected = await message.channel.awaitMessages(filter, {max: 1});
    var query = collected.first().content;
    console.log(query);


    if(collected.first().content === `${prefix}abort`){
        return message.channel.send("Seach aborted.");
    }

    else{
        var recents = [];
        let data = fs.readFileSync('history.json', 'utf8');
        console.log(data);
        jsonData = JSON.parse(data);

        for(var i=0; i<jsonData.length; i++){
            if(jsonData[i].queryingUser === message.author.username && jsonData[i].query.includes(query)){
                recents.push(jsonData[i].query);
                console.log(jsonData[i].query);
            }
        }

        if(recents.length === 0){
            return message.channel.send('Nothing found.');
        }
        
        else{
            message.channel.send('Here\'s what I found-');
            for(var j=0; j<recents.length; j++){
                message.channel.send(`-${recents[j]}`);
            }
        }
    }
}

module.exports = {recent};