const express = require('express');
const router = express.Router();
const specificatiiController = require('../controller/specificatiiController');
const { authenticate, isAdmin } = require('../middleware/auth');


/**
 * @openapi
 * /specificatii/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Specificatii
 *     summary: Adds a new package od specifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               year:
 *                  type: integer
 *               description:
 *                  type: string
 *     responses:
 *       200:
 *         description: Prize added successfully
 *       403:
 *         description: Authorization required
 */
router.post('/add', authenticate, isAdmin, specificatiiController.addSpecificatii);


/**
 * @openapi
 * /specificatii/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Specificatii
 *     summary: Deletes a package of specifications.
 *     description: This route allows admins to delete a package of specifications.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the package of specifications to delete
 *     responses:
 *       200:
 *         description: Package of specifications deleted successfully
 *       404:
 *         description: Package of specifications not found
 *       403:
 *         description: Authorization required
 */

router.delete('/delete/:id', authenticate, isAdmin, specificatiiController.deleteSpecificatii);

/**
 * @openapi
 * /specificatii/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Specificatii
 *     summary: Updates a Package of specifications
 *     description: This route allows admins to update Package of specifications.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the Package of specifications to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               year:
 *                  type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Package of specifications updated successfully
 *       404:
 *         description: Package of specifications not found
 *       403:
 *         description: Authorization required
 */
router.put('/update/:id', authenticate, isAdmin, specificatiiController.updateSpecificatii);

module.exports = router;