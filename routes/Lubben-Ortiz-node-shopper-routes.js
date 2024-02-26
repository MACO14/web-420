/*  Title: node-shopper-routes.js
    Author: Mackenzie Lubben-Ortiz
    Date: 24 February 2024
    Description: NodeShopper
*/

const express = require('express');
const router = express.Router();
const Customer = require('../models/Lubben-Ortiz-customer');

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post: 
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Create a new customer document
 *     requestBody: 
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema: 
 *             required: 
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                  type: string
 *               lastName: 
 *                  type: string
 *               userName:
 *                  type: string
 *      responses:
 *        '200':
 *          description: Customer added to MongoDB
 *        '500': 
 *          description: Server Exception
 *        '501': 
 *          description: MongoDB Exception
 */
router.post('/customer', async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };

        await Customer.create(newCustomer, function(err, customer) {
            if(err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.json(customer);
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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *   post: 
 *     tags:
 *       - Invoice
 *     name: createInvoice
 *     summary: Create a new invoice document by username
 *     requestBody: 
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema: 
 *             required: 
 *               - username
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               username:
 *                  type: string
 *               subtotal: 
 *                  type: string
 *               tax:
 *                  type: string
 *               dateCreated:
 *                  type: string
 *               dateShipped:
 *                  type: string
 *               lineItems: 
 *                  type: array of lineItem objects
 *      responses:
 *        '200':
 *          description: Customer added to MongoDB
 *        '500': 
 *          description: Server Exception
 *        '501': 
 *          description: MongoDB Exception
 */
router.post('/customers/:username/invoices', async(req, res) => {
    try {
        const newInvoice = {
            username: req.body.username,
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            dateCreated: req.body.dateCreated,
            dateShipped: req.body.dateShipped,
            lineItems: req.body.lineItems,
        }

        Customer.findOne({'username': newInvoice}, function(err, customer) {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);

                customer.set({
                    username: req.body.username,
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped,
                    lineItems: req.body.lineItems
                });

                customer.save(function(err, updatedCustomer) {
                    if(err) {
                        console.log(err);
                        res.json(updatedCustomer);
                    } else {
                        console.log(updatedCustomer);
                        res.json(updatedCustomer);
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
/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/:username/invoices
 *   get: 
 *     tags:
 *      - Invoices
 *     description: API for finding an invoice by username
 *     summary: returns an invoice document
 *     parameters: 
 *       - name: username
 *         in: path
 *         required: true
 *         description: Invoice document username
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB 
 *       '500:
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/customers/:username/invoices', async(req, res) => {
    try {
        Invoice.findOne({'username': req.params.username}, function(err, invoice) {
            if(err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(invoice);
                res.json(invoice);
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})