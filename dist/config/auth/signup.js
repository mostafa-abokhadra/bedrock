import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
passport.use('local-signup', new LocalStrategy({
    usernameField: email,
    passwordField: password
}, async (email, password, done) => {
    try {
        const hashedPassword = await bcrypt.hash(password, process.env.HASH_SALT);
        const user = await prisma.user.create({
            data: {
                email: email,
                password
            }
        });
    }
    catch (error) {
        return done(err);
    }
}));
