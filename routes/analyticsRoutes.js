const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { checkRole } = require('../middleware/roleMiddleware');

// swagger API Documentation
/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Dashboard metrics and aggregations
 * 
 * /api/analytics/summary:
 *   get:
 *     summary: Get dashboard summary totals
 *     tags: [Analytics]
 *     security:
 *       - roleHeader: []
 *     responses:
 *       200:
 *         description: Successfully fetched dashboard analytics calculations
 */


// Only analyst and admin can view the Dashboard Summary
router.get('/summary', checkRole(['analyst', 'admin']), analyticsController.getSummary);

module.exports = router;