const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { checkRole } = require('../middleware/roleMiddleware');

// All 3 role can read records
router.get('/', checkRole(['viewer', 'analyst', 'admin']), recordController.getRecords);

// Only admin can create the records
router.post('/', checkRole(['admin']), recordController.createRecord);

// Only admin can update the records
router.put('/:id', checkRole(['admin']), recordController.updateRecord);

// Only admin can delete records
router.delete('/:id', checkRole(['admin']), recordController.deleteRecord);

module.exports = router;