import  express  from "express";

import { blockAuthenticatedUser } from "../../middlewares/sessionManage.js";
import { emailValidator, passwordValidator } from "../../validation/auth/signupValidator.js";
import handleValidationError from "../../middlewares/handleValidationErrors.js";
import signupController from "../../controllers/auth/signupController.js";

const router = express.Router()

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: Register a new user
 *      description: Create a new user using email and password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *    responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post(
    '/signup',
    blockAuthenticatedUser,
    emailValidator,
    passwordValidator,
    handleValidationError,
    signupController.postSignup
)

export default router;