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
        tags: [ {
                name: "User Authentication",
                description: "signUp, login, and logout user"
            }, {
                name: "Vault",
                description: "Vault CRUD Operation APIs"
            } 
        ],
        servers: [ {
                url: 'http://localhost:8080'
            }, {
                url: 'https://bedrock-henna.vercel.app/'
            }
        ],
        components: {
            schemas: {
                signupUserReq: {
                    type: "object",
                    properties: {
                        email: { 
                            type: "string",
                            example: "user@example.com" 
                        },
                        password: {
                            type: "string",
                            example: "strongPassword123"
                        },
                        confirmPassword: {
                            type: "string",
                            example: "strongPassword123"
                        }
                    },
                    required: ["email", "password", "confirmPassword"]
                },
                signupUserRes: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            example: "random string"
                        },
                        email: {
                            type: "string",
                            example: "user@example.com"
                        }
                    }
                },
                signupBadRequest: {
                    type: "object",
                    properties: {
                        errors: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    msg: {
                                        type: 'string', example: 'invalide email'
                                    },
                                    path: {
                                        type: 'string', example: 'email',
                                    },
                                    location: {
                                        type: "string", example: "body"
                                    },
                                    type: {
                                        type: "string", example: 'field',
                                    },
                                    value: {
                                        type: "string", example: "invalideEmail@gaamil.com"
                                    }
                                },

                            }
                        }
                    }
                }
            },
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
    apis: ["./src/routes/auth/*.ts"],

}

const swaggerSpec = swaggerJSDoc(options)
console.log(JSON.stringify(swaggerSpec, null, 2));

router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)

export default router;