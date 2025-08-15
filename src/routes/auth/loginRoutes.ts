import express from "express"
import { emailValidator, passwordValidator } from "../../validation/auth/loginValidator.js";
import handleValidationError from "../../middlewares/handleValidationErrors.js";

import { blockAuthenticatedUser } from "../../middlewares/sessionManage.js";

const router = express.Router()
import loginController from '../../controllers/auth/loginController.js'


router.post(
    '/login',
    blockAuthenticatedUser,
    emailValidator,
    passwordValidator,
    handleValidationError,
    loginController.postLogin
);

export default router;