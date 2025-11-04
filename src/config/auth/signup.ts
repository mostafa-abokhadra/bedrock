import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from "bcrypt"
import { sanitizeUser } from "../../utils/userUtils.js";
import { User } from "../../models/user.model.js";

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done: any) => {
        try {
            const hashPassword = await bcrypt.hash(password, Number(process.env.HASH_SALT!))          
            const newUser = await User.create({email, password: hashPassword})
            const sanitizedUser = await sanitizeUser(newUser.email)
            if (!sanitizedUser)
                return done(true, false, {message: "coudn't sanitize user"})
            return done(null, sanitizedUser, {message: "User Created Successfully"})
        } catch(error) {
            // log errors from brypt or create()
            return done(error, false, {message: "Server Error Occured", error: error})
        }
    })
)
