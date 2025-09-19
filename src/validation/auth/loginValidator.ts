import {body} from 'express-validator'

export const emailValidator = [
    body('email')
    .not().isEmpty().withMessage("Email is Required")
    .isEmail().withMessage('Invalide Email Address')
    .normalizeEmail()
]

export const passwordValidator = [
    body('password')
    .not().isEmpty().withMessage('password is required')
]