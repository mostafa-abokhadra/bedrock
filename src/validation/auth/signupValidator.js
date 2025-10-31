"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.passwordValidator = exports.emailValidator = void 0;
var express_validator_1 = require("express-validator");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
exports.emailValidator = [
    (0, express_validator_1.body)('email')
        .trim()
        .not().isEmpty().withMessage('Email Is Required')
        .isEmail().withMessage('Invalide Email Address')
        .normalizeEmail()
        .custom(function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var isRegistered, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: { email: email }
                        })];
                case 1:
                    isRegistered = _a.sent();
                    if (!isRegistered)
                        return [2 /*return*/, true];
                    throw new Error("User is already Registered");
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); })
];
function isAlphaNum(value) {
    var isAlphanum = /^[a-z0-9]$/i.test(value);
    if (isAlphanum)
        return 1;
    return 0;
}
exports.passwordValidator = [
    (0, express_validator_1.body)('password')
        .not().isEmpty().withMessage('Password is Required')
        .isLength({ min: 12 }).withMessage('Must Contain at least 12 Character')
        .custom(function (password) {
        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57)
                return true;
        }
        throw new Error('Must Contain at Least One Number');
    })
        .custom(function (password) {
        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90)
                return true;
        }
        throw new Error('Must Contain at Least 1 Capital Letter');
    })
        .custom(function (password) {
        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)
                return true;
        }
        throw new Error('Must Contain at Least 1 Small Letter');
    })
        .custom(function (value) {
        for (var i = 0; i < value.length; i++) {
            if (!isAlphaNum(value[i]))
                return true;
        }
        throw new Error('must contain at least 1 special character');
    }),
    (0, express_validator_1.body)('confirmPassword')
        .notEmpty().withMessage('Confirm password Field is Required')
        .custom(function (password, _a) {
        var req = _a.req;
        if (password == req.body.password)
            return true;
        throw new Error('Passwords do not Match');
    }),
];
