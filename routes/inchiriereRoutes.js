const express = require('express');
const router = express.Router();
const inchiriereController = require('../controller/inchiriereController');
const { authenticate, isAdmin } = require('../middleware/auth');


/**
 * @openapi
 * /inchiriere/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Inchiriere
 *     summary: Addsa new record in Inchiriere table
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_client:
 *                 type: integer
 *               id_masina:
 *                  type: integer
 *               data_inchiriere:
 *                  type: date
 *               data_predare:
 *                  type: date
 *     responses:
 *       200:
 *         description: Prize added successfully
 *       403:
 *         description: Authorization required
 */
router.post('/inchiriaza', authenticate, inchiriereController.inchiriazaMasina);


/**
 * @openapi
 * /inchiriere/masini/:marca:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Inchiriere
 *     summary: List all the cars of a specific brand
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                  type: string
 *     responses:
 *       200:
 *         description: There is a cuple of cars
 *       403:
 *         description: Error
 */
router.get('/masini/:marca', authenticate, isAdmin, inchiriereController.masiniDupaMarca);
// Nu e necesar sa fii user sa vezi asta
router.get('/marci', inchiriereController.toateMarcile);

module.exports = router;