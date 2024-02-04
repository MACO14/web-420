/*  Title: composer.js
    Author: Mackenzie Lubben-Ortiz
    Date: 31 January 2024
    Description: Composer API
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* composer schema */

let composerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
});

module.exports = mongoose.model('Composer', composerSchema);