const fs = require('fs');

// Read the file
// Bad practice, fix later
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
    var reacter_normalized_rn = [];
    var recipient_normalized_rn = [];

    var message_count = [];
    var react_count = [];
    var received_count = [];

    for(var i = 0; i < obj['participants'].length; i++) {
        // Bad practice, fix later
        var temp = [];
        var temp2 = [];
        var temp3 = [];
        for(var j = 0; j < obj['participants'].length; j++) {
            temp.push(0);
            temp2.push(0);
            temp3.push(0);
        }

        reaction_network.push(temp);
        reacter_normalized_rn.push(temp2);
        recipient_normalized_rn.push(temp3);

        message_count.push(0);
        react_count.push(0);
        received_count.push(0);
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

                react_count[reacter]++;
                received_count[sender]++;
            }
        }

        message_count[sender]++;
    }

    var total_count = 0;
    for(person in message_count) {
        total_count += message_count[person];
    }

    for(reacter in reaction_network) {
        for(sender in reaction_network[reacter]) {
            recipient_normalized_rn[reacter][sender] =
                reaction_network[reacter][sender] * 100 / received_count[sender];

            reacter_normalized_rn[reacter][sender] =
                reaction_network[reacter][sender] * 100 / react_count[reacter];
        }
    }


    // Print raw matrices
    console.log(reaction_network);
    console.log(recipient_normalized_rn);
    console.log(reacter_normalized_rn);
    console.log(message_count);

    // Show reaction network in more readable format
    for(reacter in reaction_network) {
        for(sender in reaction_network[reacter]) {
            console.log(rev[reacter] + " reacted to " + reaction_network[reacter][sender]
                + " messages from " + rev[sender] + " (of " + rev[reacter] + "'s reactions: "
                + (Math.round(reacter_normalized_rn[reacter][sender] * 100) / 100).toFixed(2)
                + "%, of reactions received by " + rev[sender] + ": "
                + (Math.round(recipient_normalized_rn[reacter][sender] * 100) / 100).toFixed(2) + "%)");
        }
    }

    // Print out total messages
    console.log("Total messages sent: " + total_count);

    // Print first and last message in human-readable format
    var start_time = new Date(first_message['timestamp_ms']);
    var end_time = new Date(last_message['timestamp_ms']);

    console.log("Time range: " + start_time + " to " + end_time);
    console.log("First message was sent by " + first_message['sender_name']
        + " with content: " + first_message['content']);
    console.log("Last message was sent by " + last_message['sender_name']
        + " with content: " + last_message['content']);
});
