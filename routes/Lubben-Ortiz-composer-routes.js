/*  Title: composer-routes.js
    Author: Mackenzie Lubben-Ortiz
    Date: 31 January 2024
    Description: Composer API
*/

const express = require('express');
const router = express.Router();
const Composer = require('../models/Lubben-Ortiz-composer');

/* Route */

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *  get:
 *    tags:
 *       - Composers
 *    description: API for returning an array of composer objects
 *    summary: Returns an array of composers in JSON format.
 *    responses: 
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
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, fruit) {
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
 * /api/composers:
 *  post:
 *    tags:
 *       - Composers
 *    name: createComposer
 *    summary: Creates a new composer document
 *    requestBody:
 *      description: Composer information
 *      content: 
 *        application/json:
 *          schema: 
 *            required:
 *              - firstName
 *              - lastName
 *              - birthDate
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 birthDate: 
 *                   type: integer
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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate
        }

        await Composer.create(newComposer, function(err, composer) {
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

/*
* updateComposerById
* @openapi
* /api/composers/{id}:
*    put:
*      tags:
*        - Composers
*      description: Updating an existing document in MongoDB
*      parameters:
*        - name: id
*          in: path
*          required: true
*          description: Id to filter the collection by.
*          schema:
*            type: string
*      requestBody:
*        description: Composer information.
*        content:
*          application/json:
*            schema:
*              required:
*                - id
*                - firstName
*                - lastName
*              properties:
*                id:
*                  type: string
*                firstName:
*                   type: string
*                lastName: 
*                    type: string
*      responses:
*        '200':
*          description: Array of composer documents
*        '401':
*           description: Invalid composerId
*        '500':
*          description: Server Exception
*        '501':
*          description: MongoDB Exception
*/
router.put('/composer/:id', async (req, res) => {
    try {
        const composerDocId = req.params.id;

        Composer.findOne({'_id': composerDocId}, function(err, composer) {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);

                composer.set({
                    id: req.body.id,
                    fistName: req.body.firstName,
                    lastName: req.body.lastName
                });

                composer.save(function(err, updatedComposer) {
                    if(err) {
                        console.log(err);
                        res.json(updatedComposer);
                    } else {
                        console.log(updatedComposer);
                        res.json(updatedComposer);
                    }
                })
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/*
* deleteComposerById
* @openapi
* /api/delete/{id}:
*    delete:
*      tags:
*        - Composer
*      description: Deleting a composer document from MongoDB.
*      summary: Removes a composer document from MongoDB.
*      parameters:
*        - name: id
*          in: path
*          required: true
*          description: Id of the document to remove.
*          schema:
*            type: string
*      responses:
*        '200':
*          description: Composer added
*        '500':
*          description: Server Exception
*        '501':
*          description: MongoDB Exception
*/
router.delete('/composers/:id', async (req, res) => {
    try {
        const composerDocId = req.params.id;

        Composer.findByIdAndDelete({'_id': composerDocId}, function(err, composer) {
            if(err) {
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
