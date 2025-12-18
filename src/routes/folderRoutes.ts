import { Router } from "express";
import { isAuthenticated } from "../middlewares/sessionManage.js";
import csrfMiddleware from "../middlewares/csrfProtection.js";
import { parentIdValidator, nameValidator, folderIdValidator} from "../validation/folderValidator.js";
import handleValidationError from "../middlewares/handleValidationErrors.js";
import folderController from "../controllers/folderController.js";
const router = Router()

router.post(
    '/folders',
    isAuthenticated,
    csrfMiddleware,
    parentIdValidator,
    nameValidator,
    handleValidationError,
    folderController.createFolder
)

router.delete(
    '/folders',
    isAuthenticated,
    csrfMiddleware,
    folderIdValidator,
    handleValidationError,
    folderController.deleteFolder
)

router.get(
    '/folders',
    isAuthenticated,
    folderController.getFolders
)

export default router;