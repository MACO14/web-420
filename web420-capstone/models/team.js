/* 
Title: team.js
Author: Mackenzie Lubben-Ortiz
Date: 05 March 2024
Description: Team model
Business Rules: a TEAM can have many PLAYERS
                a TEAM can have one MASCOT
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Team Schema 
let teamSchema = new Schema({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema]
});

// Player Schema
let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
});

module.exports = mongoose.model('Team', teamSchema);

