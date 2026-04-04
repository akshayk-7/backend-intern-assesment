const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { checkRole } = require('../middleware/roleMiddleware');

// swagger UI API documentation for the records routes
/**
 * @swagger
 * tags:
 *   name: Records
 *   description: API to manage financial entries
 * 
 * /api/records:
 *   get:
 *     summary: Retrieve financial records
 *     tags: [Records]
 *     security:
 *       - roleHeader: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by income or expense
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search description or category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Successful retrieval of data
 * 
 *   post:
 *     summary: Create a new financial record
 *     tags: [Records]
 *     security:
 *       - roleHeader: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string, example: "paste-user-id-here" }
 *               amount: { type: number, example: 500 }
 *               type: { type: string, enum: [income, expense] }
 *               category: { type: string, example: "Freelance" }
 *               description: { type: string, example: "Side project" }
 *               date: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Successfully created record
 * 
 * /api/records/{id}:
 *   put:
 *     summary: Update an existing record
 *     tags: [Records]
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
 *               amount: { type: number, example: 750 }
 *               type: { type: string, enum: [income, expense] }
 *               category: { type: string, example: "Bonus" }
 *               description: { type: string, example: "Year end bonus" }
 *               date: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Successfully updated record
 * 
 *   delete:
 *     summary: Soft delete a record
 *     tags: [Records]
 *     security:
 *       - roleHeader: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted record
 */


// All 3 role can read records
router.get('/', checkRole(['viewer', 'analyst', 'admin']), recordController.getRecords);

// Only admin can create the records
router.post('/', checkRole(['admin']), recordController.createRecord);

// Only admin can update the records
router.put('/:id', checkRole(['admin']), recordController.updateRecord);

// Only admin can delete records
router.delete('/:id', checkRole(['admin']), recordController.deleteRecord);

module.exports = router;