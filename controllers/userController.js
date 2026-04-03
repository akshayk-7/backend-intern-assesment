const db = require('../config/db');

const getAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC');

        res.status(200).json({
            status: 'success',
            results: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        //500 status to indicate internal server error
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password_hash, role } = req.body;

        if (!username || !email || !password_hash || !role) {
            return res.status(400).json({
                status: 'error',
                message: 'All user fields are required.'
            });
        }
        const result = await db.query(
            'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, status, created_at',
            [username, email, password_hash, role]
        );
        res.status(201).json({
            status: 'success',
            data: result.rows[0]
        });
    } catch (error) {
        // Postgres error code 23505 = unique constraint violation (E.g: Email already exists).
        if (error.code === '23505') {
            return res.status(400).json({
                status: 'error',
                message: 'Validation Error: Username or Email already exists.'
            });
        }
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, status } = req.body;

        if (!role || !status) {
            return res.status(400).json({
                status: 'error',
                message: 'Role and status are both required for updating.'
            });
        }

        const result = await db.query(
            'UPDATE users SET role = $1, status = $2 WHERE id = $3 RETURNING id, username, role, status',
            [role, status, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.'
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

module.exports = {
    getAllUsers,
    createUser,
    updateUser
};