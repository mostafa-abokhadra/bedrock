import express from "express";
import {isAuthenticated} from '../middlewares/sessionManage.js'
import { User } from "../models/user.model.js";
import { sanitizeUser } from "../utils/userUtils.js";
const router = express.Router()

router.get(
    '/verify',
    isAuthenticated,
    async (req: any ,res: any) => {
        try {           
            const user: any = await User.findOne({_id: req.user._id})
            const sanitizedUser = await sanitizeUser(user.email)
            return res.status(200).json({
                message:"user is authenticated",
                user: sanitizedUser
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json({
                message: "error while verifying auth state",
                error: error
            })
        }
    }

)
export default router;