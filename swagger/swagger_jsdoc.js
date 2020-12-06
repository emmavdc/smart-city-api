const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pets Services API', 
            version: '1.0.0', 
        },
    },
    // Path to the API docs
    apis: [
        './controller/*',
        './route/*',
        './middleware/*'
    ],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
fs.writeFileSync('./swagger/spec.json', JSON.stringify(swaggerSpec));
