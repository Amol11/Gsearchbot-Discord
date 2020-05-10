const fs = require("fs");

var saveJson = (queryingUser, query) => {
    var logArray = [];
    var logArrayString;
    var createdAt = new Date().getTime();

    var currentLog = {
        queryingUser,
        query,
        createdAt,
    };

    fs.readFile('history.json', 'utf8', (err, jsonString) => {
        if(err){
            console.log('cannot read file');
            return;
        }

        // console.log("jsonstring var: ", jsonString);
        if(jsonString === ''){
            logArray.push(currentLog);
            logArrayString = JSON.stringify(logArray);
            console.log(logArrayString);
            fs.writeFile('history.json', logArrayString, err => {
                if(err){
                    console.log('Unable to write to file');
                }
                else{
                    console.log('file written successfully');
                    return;
                }
            });
        }

        else{
            var json = JSON.parse(jsonString);
            logArray = json;
            logArray.push(currentLog);
            // console.log('File data', logArray);
            logArrayString = JSON.stringify(logArray);
            console.log(logArrayString);

            fs.writeFile('history.json', logArrayString, err => {
            if(err){
                console.log('Unable to write to file.');
            }
            else{
                console.log('file successfully written.');
            }
            });
        }
    });
}

module.exports = {saveJson};