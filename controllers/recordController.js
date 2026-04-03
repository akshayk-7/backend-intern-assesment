const db = require('../config/db');

// get records with filtering
const getRecords = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        let queryStr = 'SELECT * FROM financial_records WHERE 1=1';
        let queryParams = [];
        let paramsIndex = 1;

        //if the user requested a specific type
        if (type) {
            queryStr += ` AND type = $${paramsIndex}`;
            queryParams.push(type);
            paramsIndex++;
        }
        // if user requested category 
        if (category) {
            queryStr += ` AND category = $${paramsIndex}`;
            queryParams.push(category);
            paramsIndex++;
        }
        // Date filtering
        if (startDate) {
            queryStr += `AND date >= $${paramsIndex}`;
            queryParams.push(startDate);
            paramsIndex++;
        }

        if (endDate) {
            queryStr += `AND date <= $${paramsIndex}`;
            queryParams.push(endDate);
            paramsIndex++;
        }

        queryStr += ' ORDER BY date DESC';

        const result = await db.query(queryStr, queryParams);
        res.status(200).json({
            status: 'success',
            results: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const createRecord = async (req, res) => {
    try {
        const { user_id, amount, type, category, description, date } = req.body;

        //input validation
        if (!user_id || !amount || !type || !category) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation Error: user_id, amount, type, and category are required.'
            });
        }

        // amount validation
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation Error: Amount must be valid positive number.'
            });
        }

        // validating type
        if (type !== 'income' && type !== 'expense') {
            return res.status(400).json({
                status: 'error',
                message: 'Validation Error: Type must be income or expense.'
            });
        }

        const result = await db.query(
            'INSERT INTO financial_records (user_id, amount, type, category, description, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, amount, type, category, description, date]
        );

        res.status(201).json({
            status: 'success',
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, type, category, description, date } = req.body;

        if (!amount || !type || !category) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation Error: Amount , type, and category are required to update'
            });
        }

        const result = await db.query(
            'UPDATE financial_records SET amount = $1, type = $2, category = $3, description = $4, date = $5 WHERE id = $6 RETURNING *',
            [amount, type, category, description, date, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Record not found!.'
            });
        }
        res.status(200).json({
            status: 'success',
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM financial_records WHERE id = $1', [id]);
        //204 status code means no content
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord
};