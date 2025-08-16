import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from 'swagger-ui-express'
import express from 'express'
const router = express.Router()

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'bedrock apis documentation',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
            {
                url: 'https://bedrock-henna.vercel.app/'
            }
        ]
    },
    apis: ["../routes/auth/*.ts"]
}

const swaggerSpec = swaggerJsDoc(options)

router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec))

export default router;