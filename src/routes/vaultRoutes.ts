import express from 'express';
import { isAuthenticated } from '../middlewares/sessionManage.js';
import csrfMiddleware from '../middlewares/csrfProtection.js';
import vaultController from '../controllers/vaultController.js'; 
import {nameValidator, oldNameValidator, newNameValidator} from '../validation/vaultValidator.js';
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

router.get(
    "/vaults",
    isAuthenticated,
    vaultController.getVaults
)

router.put(
    "/vaults",
    isAuthenticated,
    csrfMiddleware,
    oldNameValidator,
    newNameValidator,
    handleValidationError,
    vaultController.updateVault
)
router.delete(
    '/vaults',
    isAuthenticated,
    csrfMiddleware,
    nameValidator,
    handleValidationError,
    vaultController.deleteVault
)
export default router;;