import express from 'express';
import { isAuthenticated } from '../middlewares/sessionManage.js';
import csrfMiddleware from '../middlewares/csrfProtection.js';
import vaultController from '../controllers/vaultController.js'; 
import { nameValidator } from '../validation/vaultValidator.js';
import handleValidationError from '../middlewares/handleValidationErrors.js';

const router = express.Router();

router.post(
    '/vaults',
    isAuthenticated,
    csrfMiddleware,
    nameValidator,
    handleValidationError,
    vaultController.createVault
)
export default router;;