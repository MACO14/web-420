/*
Title: app.js
Author: Mackenzie Lubben-Ortiz
Date: 05 March 2024
Description: Main server file for capstone project
*/

const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const teamAPI = require('./routes/team-routes');

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Capstone API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsdocs(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', teamAPI);


// create server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application started and listening on port ${app.get('port')}`);
})