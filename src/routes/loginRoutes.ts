import express from "express"
import { emailValidator, passwordValidator } from "../validation/loginValidator";
import handleValidationError from "../middlewares/handleValidationErrors";

import { blockAuthenticatedUser } from "../middlewares/sessionManage";

const router = express.Router()
import loginController from '../controllers/loginController'


router.post('/login',
    blockAuthenticatedUser,
    emailValidator,
    passwordValidator,
    handleValidationError,
    loginController.postLogin
);

export default router;