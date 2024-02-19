/*  Title: user.js
    Author: Mackenzie Lubben-Ortiz
    Date: 17 February 2024
    Description: NodeSecurity
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    emailAddress: { type: array }
})

module.exports = mongoose.model('User', userSchema)