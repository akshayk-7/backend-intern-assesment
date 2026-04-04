const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Finance Dashboard API',
            version: '1.0.0',
            description: 'A simple API , Role-based Access Control (RBAC) financial backend API.',
        },
        servers: [
            {
                url: 'https://finance-dashboard-api-e13h.onrender.com',
                description: 'Production server'
            },
            {
                url: 'http://localhost:5000',
                description: 'Local server'
            }
        ],
        components: {
            securitySchemes: {
                roleHeader: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-user-role',
                    description: 'Enter your role (viewer, analyst, admin) to access the endpoints.'
                }
            }
        },
        security: [
            {
                roleHeader: []
            }
        ],
    },

    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;