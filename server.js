const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mounting the routes
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/analytics', analyticsRoutes);


app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Finance Dashboard backend is running..'
    });
});

// Error handling middleware
// 404 Not found handler
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Route Not Found: '${req.originalUrl}' does not exist on this server.`
    });
});

// Global error handler (500)
app.use((err, req, res, next) => {
    console.error('Critical Internal Fault:', err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});