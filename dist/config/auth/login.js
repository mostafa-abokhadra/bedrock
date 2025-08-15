import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sanitizeUser } from "../../utils/userUtils.js";
const prisma = new PrismaClient();
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return done(null, false, { Message: "Email or password is incorrect" });
        }
        if (!user.password) {
            return done(null, false, {
                message: "This account uses Google login. Please sign in with Google.",
            });
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword)
            return done(null, false, { Message: "Email or password is incorrect" });
        const sanitizedUser = await sanitizeUser(user.email);
        return done(null, sanitizedUser);
    }
    catch (error) {
        return done(error, false, { Message: "Server Error Occured", Error: error });
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            vaults: true
        }
    });
    done(null, user);
});
