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
        passport_1.default.authenticate('local-login', (err, user, info) => {
            if (err || !user)
                return res.status(500).json(info);
            console.log(user);
            req.logIn(user, (err) => {
                if (err)
                    return res.status(500).json(`Can't Login User`);
            });
            console.log("req.user", req.user);
            console.log("============");
            console.log(req.session, req.session);
            return res.status(200).json({
                'info': "User Authenticated Successfully",
                user: user
            });
        })(req, res, next);
    }
}
exports.default = loginController;
