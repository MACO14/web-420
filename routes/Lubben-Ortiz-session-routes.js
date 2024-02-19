/*  Title: session-routes.js
    Author: Mackenzie Lubben-Ortiz
    Date: 17 February 2024
    Description: NodeSecurity
*/

const express = require('express');
const router = express.Router();
const User = require('../models/Lubben-Ortiz-user');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

/** 
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     name: signup
 *     summary: Register user
 *     requestBody:
 *        description: User information
 *        content: 
 *          application/json:
 *            schema: 
 *              required:
 *                - userName
 *                - password
 *                - emailAddress
 *              properties:
 *                 userName:
 *                   type: string
 *                 password:
 *                   type: string
 *                 emailAddress: 
 *                    type: string
 *      responses:
 *        '200':
 *           description: Registered user
 *        '401': Username is already in use
 *        '500': Server Exception
 *        '501': MongoDB Exception
 */
router.post('/signup', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(user);
                if(user) {
                    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                    const newRegisteredUser = {
                        userName: "username",
                        pass: hashedPassword,
                        email: 'email'
                    }

                    await User.create(newUser, function(err, password) {
                        if(err) {
                            console.log(err);
                            res.status(401).send({
                                'message': `Username is already in use: ${err}`
                            })
                        } else {
                            console.log(user);
                            res.json(user);
                        }
                    })
                } catch (e) {
                console.log(e);
                res.status(500).send({
                    'message': `Server Exception: ${err}`
                })
                }
            }
        })
    }
})
/** 
 * login
 * @openapi
 * /api/login:
 *   post:
 *     name: login
 *     summary: Verify user
 *     requestBody:
 *        description: User information
 *        content: 
 *          application/json:
 *            schema: 
 *              required:
 *                - userName
 *                - password
 *              properties:
 *                 userName:
 *                   type: string
 *                 password:
 *                   type: string
 *      responses:
 *        '200':
 *           description: User logged in
 *        '401': Invalid username and/or password
 *        '500': Server Exception
 *        '501': MongoDB Exception
 */
router.post('/login', async(req, res) => {
    try {
        Password.findOne({'passId': req.body.passId}, function(err, password) {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(password);
                if(password) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, password, user.password);

                    if(passwordIsValid) {
                        console.log('Password matches');
                        res.status(200).send({
                            'message': 'Password matches'
                        })
                    } else {
                        console.log('Password is incorrect');
                        res.status(401).send({
                            'message': `Invalid passId or password`
                        })
                    } 
                } else {
                    console.log('Invalid passId');
                    res.status(401).send({
                        'message': `Invalid passId or password`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})

module.exports = router;
