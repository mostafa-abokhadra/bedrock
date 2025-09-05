import { Router } from "express";
const router = Router();
import csrfProtection from "../../middlewares/csrfProtection.js";
router.get('/csrf-token', csrfProtection, (req, res) => {
    return res.json({ csrfToken: req.csrfToken() });
});
export default router;
