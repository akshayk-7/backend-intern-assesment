const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        require: true,
        rejectUnauthorized: false,
    }
});

pool.on('connect', () => {
    console.log('PostgreSQL database connected.');
});

pool.on('error', (err) => {
    console.error('Unexpeted Database connection fault:', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) =>
        pool.query(text, params),
};