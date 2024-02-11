/*  Title: person-routes.js
    Author: Mackenzie Lubben-Ortiz
    Date: 09 February 2024
    Description: Composer API
*/

const express = require('express');
const router = express.Router();
const Person = require('../models/Lubben-Ortiz-person');

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *  get:
 *     tags:
 *        - Persons
 *     description: API for returning a list of person documents from MongoDB
 *     summary: return list of person document
 *     responses: 
 *       '200':
 *          description: Array of person documents
 *       '500':
 *          description: Server Exception
 *       '501': 
 *          description: MongoDB Exception
 */
router.get('/persons', async(req, res) => {
    try {
        Person.find({}, function(err, persons) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(persons);
                res.json(persons);
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
 * createPerson
 * @openapi
 * /api/persons:
 *  post:
 *     tags:
 *        - Persons
 *     name: createPerson
 *     summary: creates a new person document
 *     requestBody:
 *        description: Person information
 *        content:
 *          application/json:
 *             schema:
 *               required:
 *                  - firstName
 *                  - lastName
 *                  - roles
 *                  - dependents
 *                  - birthDate
 *               properties: 
 *                  firstName:
 *                      type: string
 *                  lastName: 
 *                      type: string
 *                  roles: 
 *                      type: array
 *                      items: object
 *                  dependents:
 *                      type: array
 *                      items: object
 *                  birthDate:
 *                      type: integer
 *                      format: int64
 *                    createdAt:
 *                       type: string
 *                       format: date
 *                       description: creation date
 *      responses: 
 *       '200':
 *          description: Array of person documents
 *       '500':
 *          description: Server Exception
 *       '501': 
 *          description: MongoDB Exception
 */
router.post('/persons', async(req, res) => {
    try {
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,

        };

        await Person.create(newPerson, function(err, person) {
            if(err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception ${err}`
                })
            } else {
                console.log(person);
                res.json(person);
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
