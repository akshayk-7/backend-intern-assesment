const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkRole } = require('../middleware/roleMiddleware');

// Swagger UI API Documentation
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage user accounts and roles
 * 
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - roleHeader: []
 *     responses:
 *       200:
 *         description: Successful retrieval of users
 * 
 *   post:
 *     summary: Create a new user account
 *     tags: [Users]
 *     security:
 *       - roleHeader: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string, example: "admin_user" }
 *               email: { type: string, example: "admin@example.com" }
 *               password: { type: string, example: "securepassword" }
 *               role: { type: string, enum: [viewer, analyst, admin] }
 *     responses:
 *       201:
 *         description: Successfully created user
 * 
 * /api/users/{id}:
 *   put:
 *     summary: Update user role or status (Admin only)
 *     tags: [Users]
 *     security:
 *       - roleHeader: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role: { type: string, enum: [viewer, analyst, admin] }
 *               status: { type: string, enum: [active, inactive] }
 *     responses:
 *       200:
 *         description: User status/role updated successfully
 */


// Only admin should be allowed to view the users lists
router.get('/', checkRole(['admin']), userController.getAllUsers);
router.post('/', checkRole(['admin']), userController.createUser);
router.put('/:id', checkRole(['admin']), userController.updateUser);


module.exports = router;