import {body} from 'express-validator'

export const emailValidator = [
    body('email')
    .isEmail().withMessage('Invalide Email Address')
    .normalizeEmail()
]

export const passwordValidator = [
    body('password')
    .notEmpty().withMessage('password field is required')
    .isLength({min: 12}).withMessage('password should contain at least 12 character')
    .custom((value) => {
        // contains a number
        for(let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57)
                return true
        }
        throw new Error('Must Contain at Least One Number')
    })
    .custom((value) => {
        // contains capital letter
        for(let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) >= 65 && value.charCodeAt(i) <= 90)
                return true
        }
        throw new Error('Must Contain at Least 1 Capital Letter')
    })
    .custom((value) => {
        // contains small letter
        for(let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) >= 97 && value.charCodeAt(i) <= 122)
                return true
        }
        throw new Error('Must Contain at Least 1 Small Letter')
    }),

    body('confirmPassword')
    .notEmpty().withMessage('Confirm password Field is Required')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not Match');
        }
        return true;
    }),
]