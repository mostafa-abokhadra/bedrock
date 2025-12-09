import { body, param } from "express-validator";

const vaultIdValidator = [
    param("vaultId")
    .not().isEmpty().withMessage("vault id is required")
]

const nameValidator = [
    body("name")
    .not().isEmpty().withMessage("folder name is required")
    .isString().withMessage("folder name must be a string")
    .isLength({max: 30}).withMessage("folder name must not excced 30 character")
]