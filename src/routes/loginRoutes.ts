import express from "express"
import { emailValidator, passwordValidator } from "../validation/loginValidator";
import { blockAuthenticatedUser } from "../middlewares/sessionManage";

const router = express.Router()
import loginController from '../controllers/loginController'


router.post('/login',
    blockAuthenticatedUser,
    emailValidator,
    passwordValidator,
    loginController.postLogin
);

export default router;