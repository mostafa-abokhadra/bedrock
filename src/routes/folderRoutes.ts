import { Router } from "express";
import { isAuthenticated } from "../middlewares/sessionManage.js";
import csrfMiddleware from "../middlewares/csrfProtection.js";
const router = Router()

router.post(
    '/folders',
    isAuthenticated,
    csrfMiddleware,
)

export default router;