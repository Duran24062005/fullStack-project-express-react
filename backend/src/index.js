import express from 'express'
import { app_config } from './config/app.config.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swaggerConfig.js'
import cors from 'cors'

const app = express()
const port = app_config.app.port


// Middleware para servir la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Habilitar CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ruta de inicio
app.get('/', (_req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Portfolio API V4',
        version: '1.0.0',
        endpoints: {
            blogs: '/api/blogs',
            projects: '/api/projects'
        }
    });
});


app.get('/hola', (req, res) => {
    res.status(200).json([
        {
            "status": "Succesfully",
            "code": 200
        }
    ])
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))