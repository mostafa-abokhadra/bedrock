import express from 'express';
import { isAuthenticated } from '../middlewares/sessionManage.js';
import csrfMiddleware from '../middlewares/csrfProtection.js';

const router = express.Router();

router.post(
    '/vaults',
    isAuthenticated,
    csrfMiddleware,
    vaultController.createVault
)
export default router;;