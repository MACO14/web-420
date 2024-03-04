// 
// Name: Mackenzie Lubben-Ortiz
// Date: 1/14/2024
// Description: app.js

import { ComposerAPI } from './routes/Lubben-Ortiz-composer-routes';
import { PersonAPI } from './routes/Lubben-Ortiz-person-routes';
import { userAPI } from './routes/Lubben-Ortiz-session-routes';
import { customerAPI } from './routes/Lubben-Ortiz-node-shopper-routes'

// require statements

const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composerAPI = require('./routes/Lubben-Ortiz-composer-routes');
const personAPI = require('./routes/Lubben-Ortiz-person-routes');
const userAPI = require('./routes/Lubben-Ortiz-session-routes');
const customerAPI = require('./routes/Lubben-Ortiz-node-shopper-routes');


// instance of the express() module
const app = express();

// app.use statements

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({'extended': true}));

// swagger configurations

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },

    apis: ['./routes/*.js'], 
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', customerAPI);

// createServer
http.createServer(app).listen(app.get('port'), function () {
    console.log("Application started and listening on port" + app.get("port"));
})

