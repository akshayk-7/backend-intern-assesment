const analyticsService = require('../services/analyticsService');

const getSummary = async (req, res) => {
    try {
        const dashboardData = await analyticsService.getDashboardSummary();

        res.status(200).json({
            status: 'success',
            data: dashboardData
        });
    } catch (error) {
        console.error('Analytics Fetch Error', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to generate dashboard summary'
        });
    }
};

module.exports = { getSummary };