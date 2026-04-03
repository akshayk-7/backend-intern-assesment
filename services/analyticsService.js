const db = require('../config/db');

const getDashboardSummary = async () => {

    // COALESCE is used to return if there is no data, it will cleanly returns 0 instead of null
    const summaryQuery = ` 
    SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END),0) AS total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END),0) AS total_expense,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END),0) AS net_balance
    FROM financial_records 
    WHERE deleted_at IS NULL
    `;

    const categoryQuery = `
    SELECT category, type, SUM(amount) AS total
    FROM financial_records
    WHERE deleted_at IS NULL
    GROUP BY category, type
    ORDER BY total DESC
    `;

    const recentQuery = `
    SELECT * FROM financial_records
    WHERE deleted_at IS NULL
    ORDER BY date DESC
    LIMIT 5
    `;

    const [summaryResult, categoryResult, recentResult] = await Promise.all([
        db.query(summaryQuery),
        db.query(categoryQuery),
        db.query(recentQuery)
    ]);

    return {
        overview: summaryResult.rows[0],
        breakdownList: categoryResult.rows,
        recentActivity: recentResult.rows
    };
};

module.exports = { getDashboardSummary };