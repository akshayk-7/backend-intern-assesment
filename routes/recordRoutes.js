const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { checkRole } = require('../middleware/roleMiddleware');

// swagger documentation for the records routes
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
 *     responses:
 *       200:
 *         description: Successful retrieval of data
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