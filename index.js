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


    // If there aren't any messages, break out
    if (obj['messages'].length == 0) {
        console.error("File does not have any data");
        return;
    }

    var dict = {};
    var rev = {};
    for(participant in obj['participants']) {
        dict[obj['participants'][participant]['name']] = participant;
        rev[participant] = obj['participants'][participant]['name'];
    }
    // console.log(dict);

    // Create arrays to store data
    var reaction_network = [];
    var message_count = [];
    for(var i = 0; i < obj['participants'].length; i++) {
        var temp = [];
        for(var j = 0; j < obj['participants'].length; j++) {
            temp.push(0);
        }

        reaction_network.push(temp);
        message_count.push(0);
    }

    // Log first and last message:
    const last_message = obj['messages'][0];
    const first_message = obj['messages'][obj['messages'].length - 1];

    console.log(first_message);
    console.log(last_message);

    // Loop through messages to get statistics
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
                    reaction_network[reacter][sender]++;
                }

                // Print out self-react messages for posterity
                if(reacter == sender) {
                    console.log(msg);
                }
            }
        }

        message_count[sender]++;
    }

    var total_count = 0;
    for(person in message_count) {
        total_count += message_count[person];
    }

    // Print raw matrices
    console.log(reaction_network);
    console.log(message_count);

    // Print out total messages
    console.log("Total messages sent: " + total_count);

    // Print first and last message in human-readable format
    var start_time = new Date(first_message['timestamp_ms']);
    var end_time = new Date(last_message['timestamp_ms']);

    console.log("Time range: " + start_time + " to " + end_time);

    // Show reaction network in more readable format
    for(reacter in reaction_network) {
        for(sender in reaction_network[reacter]) {
            console.log(rev[reacter] + " reacted to " + reaction_network[reacter][sender] + " messages from " + rev[sender]);
        }
    }
});
