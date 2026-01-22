import swaggerJSDoc from 'swagger-jsdoc';
import { app_config } from './config/app.config.js';
'./routes/users.router.js'

const options = {
    definition: {
        openapi: '3.0.0', // O '2.0'
        info: {
            title: 'Mi API Express',
            version: '1.0.0',
            description: 'Documentación de mi API RESTful',
        },
        servers: [
            { url: `http://localhost:${app_config.app.port}` } // Tu URL base
        ],
    },
    apis: ['./routes/*.js', './index.js'], // Archivos a escanear para comentarios
};

const swaggerSpec = swaggerJSDoc(options);


export default swaggerSpec;