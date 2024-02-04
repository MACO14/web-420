/*  Title: composer-routes.js
    Author: Mackenzie Lubben-Ortiz
    Date: 31 January 2024
    Description: Composer API
*/

const express = require('express');
const router = express.Router();
const Composer = require('../models/Lubben-Ortiz-composer');

// Routes

/**
 * findAllComposers
 * @openapi
 * /composers:
 *  get:
 *    tags:
 *       - Composers
 *     description: API for returning an array of composer objects
 *     summary: Returns an array of composers in JSON format.
 *     responses: 
 *        '200':
 *          description: array of composers.
 *        '500':
 *           description: Server Exception.
 *        '501':
 *           description: MongoDB Exception.
 */
router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})
/**
 * findComposerById
 * @openapi
 * /composers/{id}:
 *  get
 *    tags:
 *       - Composers
 *     description: API for returning a composer based on ID
 *     summary: returns a composer by ID
 *      parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Composer document id
 *           schema:
 *              type: string
 *     responses: 
 *        '200':
 *          description: Composer found.
 *        '500':
 *           description: Server Exception.
 *        '501':
 *           description: MongoDB Exception.
 */
router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })  
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})
/**
 * createComposer
 * @openapi
 * /composers:
 *  post:
 *    tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
 *     requestBody:
 *        description: Composer information
 *        content: 
 *          application/json:
 *             schema: 
 *               required:
 *                  - type
 *               properties:
 *                  type:
 *                    type: string
 *     responses: 
 *        '200':
 *          description: Composer added.
 *        '500':
 *           description: Server Exception.
 *        '501':
 *           description: MongoDB Exception.
 */
router.post('/composers', async(req,res) => {
    try {
        const newComposer = {
            type: req.body.type
        }

        await Composer.create(newComposer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        }) 
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;