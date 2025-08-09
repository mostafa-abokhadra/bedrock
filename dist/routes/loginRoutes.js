"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginValidator_1 = require("../validation/loginValidator");
const handleValidationErrors_1 = __importDefault(require("../middlewares/handleValidationErrors"));
const sessionManage_1 = require("../middlewares/sessionManage");
const router = express_1.default.Router();
const loginController_1 = __importDefault(require("../controllers/loginController"));
router.post('/login', sessionManage_1.blockAuthenticatedUser, loginValidator_1.emailValidator, loginValidator_1.passwordValidator, handleValidationErrors_1.default, loginController_1.default.postLogin);
exports.default = router;
