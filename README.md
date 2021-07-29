# Group Chat Visualizer

This repository stores some explorations I'm doing out of curiosity in the summer.
Specifically, I seek to utilize stored Messenger data to quantify interesting things
about social dynamics in any specific group-chat. For now, there are a couple statistics
I seek to visualize (likely put into a "report" style PDF after running).

## Target Features
 - [X] First message, last message, number of messages
 - [X] Number of messages sent by any specific person
 - [X] Reaction "graph" between people: who reacts to who
    - [X] Normalized by the total number of reactions a person gives out
    - [X] Normalized by the total number of reactions a person receives
    - [X] Unnormalized
 - [ ] Line graph of activity and statistics about activity by weekday or season
 - [ ] Information on message length
    - [ ] Versus time
    - [ ] By person

## Display Methods
 - [ ] Command Line Interface
 - [ ] Generated PDF to output directory
 - [ ] Web generation / upload for ease of access

Likely create charts using Chart.js or similar...

This started because I wanted to analyze the interactions between my friends during
the coronavirus pandemic. I plan on putting all my things into a website (that might
be hosted with GitHub Pages) once I've completed this to-do list. Suggestions are welcome!

## Using the Visualizer

For now, the project is not very user-friendly, since I'm still developing features.
The program will spit out raw statistics via the command line that you can then
format as you please. First, change the path to the message on the first line of
`index.js` (by default it looks for "message_1.json").

To run, simply type `node index.js`.
