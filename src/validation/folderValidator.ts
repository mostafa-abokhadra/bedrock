import { body } from "express-validator";

export const parentIdValidator = [
    body("parentId")
    .not().isEmpty().withMessage("parent id is required")
]

export const nameValidator = [
    body("name")
    .not().isEmpty().withMessage("folder name is required")
    .isString().withMessage("folder name must be a string")
    .isLength({max: 30}).withMessage("folder name must not excced 30 character")
]

export const folderIdValidator = [
    body("folderId")
    .not().isEmpty().withMessage("folder Id is required")
]

export const oldNameValidator = [
    body('oldName')
    .not().isEmpty().withMessage("old name is required")
]