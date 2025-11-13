import { body } from "express-validator";

export const nameValidator = [
    body('name')
    .not().isEmpty().withMessage("vault name is required")
]

export const oldNameValidator = [
    body('oldName')
    .not().isEmpty().withMessage("old name is required")
]
export const newNameValidator = [
    body('newName')
    .not().isEmpty().withMessage("new name is required")
]
