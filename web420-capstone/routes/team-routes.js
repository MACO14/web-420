/*
Title: team-routes.js
Author: Mackenzie Lubben-Ortiz
Date: 05 March 2024
Description: Team API
*/

const express = require('express');
const router = express.Router();
const Team = require('../models/team');

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get: 
 *     tags: 
 *       - Teams
 *     description: API for returning an array of team documents
 *     summary: returns an array of teams in JSON format
 *     responses:
 *       '200':
 *         description: array of team documents
 *       '500': 
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/teams', async(req, res) => {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(teams);
                res.json(teams);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players
 *   get: 
 *     tags: 
 *       - Teams
 *     description: API for assigning a player to a team
 *     summary: returns a player document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Player document id
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Player Information
 *       content: 
 *         application/json:
 *           schema: 
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName: 
 *                  type: string
 *               lastName: 
 *                  type: string
 *               salary: 
 *                  type: string
 *    responses:
 *      '200':
 *        description: Player document
 *      '401': 
 *        description: Invalid teamId
 *      '500':
 *         description: Server Exception
 *      '501': 
 *         description: MongoDB Exception              
 */
router.post('/teams/:id/players', async (req, res) => {
    try {
        const playerId = {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary
        };

        await Player.create(newPlayer, function(err, player) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(player);
                res.json(player);
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
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players
 *   get:
 *     tags: 
 *       - Players
 *     description: API for returning player documents
 *     summary: returns player documents
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team document id
 *         schema: 
 *            type: string
 *     responses: 
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501': 
 *         description: MongoDB Exception
 */
router.get('/teams/:id/players', async(req, res) => {
    try {
        Player.findAll({'_id': req.params.id}, function(err, player) {
            if(err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(player);
                res.json(player);
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *      - Teams
 *     name: deleteTeam
 *     description: API for deleting a team document from MongoDB
 *     summary: Removes a team document from MongoDB
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove
 *         schema:
 *           type: string
 *    responses:
 *      '200': 
 *        description: Team document
 *      '401':
 *        description: Invalid teamId
 *      '500':
 *        description: Server Exception
 *      '501':
 *        description: MongoDB Exception
 */
router.delete('/teams/:id', async (req, res) => {
    try {
        const teamId = req.params.id;

        Team.findByIdAndDelete({'_id': teamId}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router