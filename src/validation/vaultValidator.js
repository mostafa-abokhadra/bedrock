"use strict";
exports.__esModule = true;
exports.nameValidator = void 0;
var express_validator_1 = require("express-validator");
exports.nameValidator = [
    (0, express_validator_1.body)('name')
        .not().isEmpty().withMessage("vault name is required")
];
