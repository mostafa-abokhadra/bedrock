import { body, param } from "express-validator";

export const parentIdValidator = [
    param("parentId")
    .not().isEmpty().withMessage("parent id is required")
]

export const nameValidator = [
    body("name")
    .not().isEmpty().withMessage("folder name is required")
    .isString().withMessage("folder name must be a string")
    .isLength({max: 30}).withMessage("folder name must not excced 30 character")
]
