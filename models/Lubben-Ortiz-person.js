/*  Title: people.js
    Author: Mackenzie Lubben-Ortiz
    Date: 09 February 2024
    Description: Composer API
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* role schema */

let roleSchema = new Schema({
    text: { type: String },
});

/* dependent schema */

let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

/* person schema */

let personSchema = new Schema({
    firsName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String }
})

module.exports = mongoose.model('Person', personSchema);