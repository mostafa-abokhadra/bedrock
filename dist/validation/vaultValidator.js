import { body } from "express-validator";
export const nameValidator = [
    body('name')
        .not().isEmpty().withMessage("vault name is required")
];
