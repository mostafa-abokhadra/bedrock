"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class loginController {
    static async postLogin(req, res, next) {
        const user = await new Promise((resolve, reject) => {
            passport_1.default.authenticate('local-login', (err, user, info) => {
                if (err)
                    return reject(err);
                if (!user)
                    return reject(info.message);
                req.logIn(user, (err) => {
                    if (err)
                        return reject(err);
                    resolve(user);
                });
            })(req, res, next);
        });
        return res.status(200).json({
            'info': "User Authenticated Successfully",
            user: user
        });
    }
}
exports.default = loginController;
