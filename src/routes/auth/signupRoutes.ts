import  express  from "express";

import { blockAuthenticatedUser } from "../../middlewares/sessionManage.js";
import { emailValidator, passwordValidator } from "../../validation/auth/signupValidator.js";
import handleValidationError from "../../middlewares/handleValidationErrors.js";
import signupController from "../../controllers/auth/signupController.js";

const router = express.Router()

router.post(
    '/signup',
    blockAuthenticatedUser,
    emailValidator,
    passwordValidator,
    handleValidationError,
    signupController.postSignup
)

export default router;