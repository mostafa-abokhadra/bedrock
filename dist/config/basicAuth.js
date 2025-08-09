"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
passport_1.default.use('local-login', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        console.log(user);
        if (!user)
            return done(null, false, { Message: "Email or password is incorrect" });
        if (!user.password) {
            return done(null, false, {
                message: "This account uses Google login. Please sign in with Google.",
            });
        }
        console.log(user, "2");
        const validatePassword = await bcrypt_1.default.compare(password, user.password);
        if (!validatePassword)
            return done(null, false, { Message: "Email or password is incorrect" });
        console.log(user, "3");
        return done(null, user);
    }
    catch (error) {
        return done(error, false, { Message: "Server Error Occured", Error: error });
    }
}));
passport_1.default.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true
        }
    });
    console.log(user);
    done(null, user);
});
exports.default = passport_1.default;
