"use strict";
exports.__esModule = true;
exports.passwordValidator = exports.emailValidator = void 0;
var express_validator_1 = require("express-validator");
exports.emailValidator = [
    (0, express_validator_1.body)('email')
        .not().isEmpty().withMessage("Email is Required")
        .isEmail().withMessage('Invalide Email Address')
        .normalizeEmail()
];
exports.passwordValidator = [
    (0, express_validator_1.body)('password')
        .not().isEmpty().withMessage('password is required')
];
