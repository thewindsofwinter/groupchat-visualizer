const fs = require('fs');

// Read the file
fs.readFile('message_1.json', 'utf8' , (err, data) => {
    // If there's an error, break out
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JSON data and create dictionary to map names to numbers
    const obj = JSON.parse(data);
    var dict = {};
    var rev = {};
    for(participant in obj['participants']) {
        dict[obj['participants'][participant]['name']] = participant;
        rev[participant] = obj['participants'][participant]['name'];
    }
    // console.log(dict);

    // Create arrays to store data
    var array = [];
    var a2 = [];
    for(var i = 0; i < obj['participants'].length; i++) {
        var temp = [];
        for(var j = 0; j < obj['participants'].length; j++) {
            temp.push(0);
        }
        array.push(temp);
        a2.push(0);
    }

    for(message in obj['messages']) {
        const msg = obj['messages'][message];
        var people = [];
        const sender = dict[msg['sender_name']];

        // Check if exists
        if(msg['reactions']) {
            for(reaction in msg['reactions']) {
                const reacter = dict[msg['reactions'][reaction]['actor']];
                if(!people.includes(reacter)) {
                    people.push(reacter);
                    array[reacter][sender]++;
                }

                if(reacter == sender) {
                    console.log(msg);
                }
            }
        }

        a2[sender]++;
    }

    console.log(array);
    console.log(a2);

    for(reacter in array) {
        for(sender in array[reacter]) {
            console.log(rev[reacter] + " reacted to " + array[reacter][sender] + " messages from " + rev[sender]);
        }
    }
});
