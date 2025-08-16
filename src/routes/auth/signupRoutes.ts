import  express  from "express";

import { blockAuthenticatedUser } from "../../middlewares/sessionManage.js";
import { emailValidator, passwordValidator } from "../../validation/auth/signupValidator.js";
import handleValidationError from "../../middlewares/handleValidationErrors.js";
import signupController from "../../controllers/auth/signupController.js";

const router = express.Router()

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - User Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signupUserReq'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/signupUserRes'
 *       400:
 *         description: invalide user input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/signupBadRequest"
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