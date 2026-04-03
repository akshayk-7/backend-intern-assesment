const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { checkRole } = require('../middleware/roleMiddleware');

// Only analyst and admin can view the Dashboard Summary
router.get('/summary', checkRole(['analyst', 'admin']), analyticsController.getSummary);

module.exports = router;