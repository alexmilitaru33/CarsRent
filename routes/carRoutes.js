const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth'); 
const carController = require('../controller/masinaController');


/**
 * @openapi
 * /cars/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     summary: Adds a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               model:
 *                 type: string
 *               pret:
 *                 type: integer
 *               win:
 *                 type: string
 *               id_specificatii:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Car added successfully
 *       403:
 *         description: Unauthorized
 */
router.post('/add', authenticate, isAdmin, carController.addMasina);

/**
 * @openapi
 * /cars/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     summary: Deletes a specific car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       403:
 *         description: Unauthorized
 */
router.delete('/delete/:id', authenticate, isAdmin, carController.deleteMasina);

/**
 * @openapi
 * /cars/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     summary: Updates a specific car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               model:
 *                 type: string
 *               pret:
 *                 type: integer
 *               win:
 *                 type: string
 *               id_specificatii:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 *       403:
 *         description: Unauthorized
 */
router.put('/update/:id', authenticate, isAdmin, carController.updateMasina);

/**
 * @openapi
 * /cars/sorted/asc:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     summary: Retrieves all cars sorted in ascending order by price
 *     responses:
 *       200:
 *         description: A list of cars sorted in ascending order by price
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   marca:
 *                     type: string
 *                   model:
 *                     type: string
 *                   pret:
 *                     type: integer
 *                   win:
 *                     type: string
 *                   id_specificatii:
 *                     type: integer
 *       403:
 *         description: Unauthorized
 */
router.get('/sorted/asc', carController.getMasiniCrescator);

/**
 * @openapi
 * /cars/sorted:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     summary: Retrieves all cars sorted in descending order by price
 *     responses:
 *       200:
 *         description: A list of cars sorted in descending order by price
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   marca:
 *                     type: string
 *                   model:
 *                     type: string
 *                   pret:
 *                     type: integer
 *                   win:
 *                     type: string
 *                   id_specificatii:
 *                     type: integer
 *       403:
 *         description: Unauthorized
 */
router.get('/sorted', carController.getMasiniDescrescator);


module.exports = router;