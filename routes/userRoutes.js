const express = require('express');
const userController = require('../controller/userController');
const { authenticate, isAdmin } = require('../middleware/auth'); 
const router = express.Router();

/**
 * @openapi
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Error in registration
 */
router.post('/register', userController.register);

/**
 * @openapi
 * /users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Logout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User was disconected successfully
 *       400:
 *         description: Error in logout
 */

router.post('/logout', userController.logout);

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User loged successfully
 *       400:
 *         description: Error in logging
 */
router.post('/login', userController.login);

/**
 * @openapi
 * /users/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Allows admins to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, missing fields, or incorrect data
 *       403:
 *         description: Authorization required
 */
router.post('/create', userController.createUser);

/**
 * @openapi
 * /users/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Update a user
 *     description: Allows admins to update an existing user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request, missing fields, or incorrect data
 *       404:
 *         description: User not found
 *       403:
 *         description: Authorization required
 */
router.put('/update/:id', authenticate, isAdmin, userController.updateUser);

/**
 * @openapi
 * /users/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     description: Allows admins to delete a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Authorization required
 */
router.delete('/delete/:id', authenticate, isAdmin, userController.deleteUser);


module.exports = router;
