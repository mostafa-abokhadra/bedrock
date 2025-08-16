import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from 'swagger-ui-express'
import express from 'express'

const router = express.Router()

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'bedrock apis documentation',
            version: '1.0.0',
            description: "bedrock apis documentation"
        },
        tags: [
            {
                name: "User Authentication",
                description: "signUp, login, and logout user"
            },
            {
                name: "Vault",
                description: "Vault CRUD Operation APIs"
            }
        ],
        servers: [
            {
                url: 'http://localhost:8080',
            },
            {
                url: 'https://bedrock-henna.vercel.app/'
            }
        ],
        components: {
            securitySchemes: {
                // Bearer: {
                //     type: 'http',
                //     schema: "bearer",
                //     bearFormat: "JWT",
                //     description: "basic auth"
                // },
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'google-api-key',
                    description: 'auth with google'
                }
            },
        },
    },
    apis: ["./src/routes/auth/*.ts/"],

}

const swaggerSpec = swaggerJSDoc(options)
console.log(JSON.stringify(swaggerSpec, null, 2));

router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)

export default router;