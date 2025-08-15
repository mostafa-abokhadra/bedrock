import {body} from "express-validator"

const emailValidator = [
    body('email')
    .not().isEmpty().withMessage('Email Is Required')
    .isEmail().withMessage('Invalide Email Address')
    .normalizeEmail()
]
