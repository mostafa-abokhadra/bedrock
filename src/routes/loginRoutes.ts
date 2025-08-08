import express from "express"
const router = express.Router()
import loginController from '../controllers/loginController'


router.post('/login', loginController.postLogin);

export default router;