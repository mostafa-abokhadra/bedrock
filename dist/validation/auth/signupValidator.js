import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const emailValidator = [
    body('email')
        .trim()
        .not().isEmpty().withMessage('Email Is Required')
        .isEmail().withMessage('Invalide Email Address')
        .normalizeEmail()
        .custom(async (email) => {
        try {
            const isRegistered = await prisma.user.findUnique({
                where: { email }
            });
            if (!isRegistered)
                return true;
            throw new Error("User is already Registered");
        }
        catch (error) {
            throw new Error("Error while validating User");
        }
    })
];
export const passwordValidator = [
    body('password')
        .not().isEmpty().withMessage('Password is Required')
        .isLength({ min: 12 }).withMessage('Must Contain at least 12 Character')
        .custom((password) => {
        for (let i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57)
                return true;
        }
        throw new Error('Must Contain at Least One Number');
    })
        .custom((password) => {
        for (let i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90)
                return true;
        }
        throw new Error('Must Contain at Least 1 Capital Letter');
    })
        .custom((password) => {
        for (let i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)
                return true;
        }
        throw new Error('Must Contain at Least 1 Small Letter');
    }),
    body('confirmPassword')
        .notEmpty().withMessage('Confirm password Field is Required')
        .custom((password, { req }) => {
        if (password == req.body.password)
            return true;
        throw new Error('Passwords do not Match');
    }),
];
