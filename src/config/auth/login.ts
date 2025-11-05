import passport from "passport"
import {Strategy as LocalStrategy} from "passport-local"
import bcrypt from "bcrypt"
import { sanitizeUser } from "../../utils/userUtils.js"
import { User } from "../../models/user.model.js"

passport.use(
    'local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email: string, password: any, done: any) => {
        try {
            const user = await User.findOne({email})

            if (!user) {
                return done(null, false, {Message: "Email or password is incorrect"})
            }

            if (!user.password) {
                return done(null, false, {
                    message: "This account uses Google login. Please sign in with Google.",
                });
                // add: provider, googleId, picture fields in user schema
            }

            const validatePassword = await bcrypt.compare(password, user.password)
            if (!validatePassword)
                return done(null, false, {Message: "Email or password is incorrect"});

            const sanitizedUser = await sanitizeUser(user.email)
            if (!sanitizeUser)
                return done(true, false, {message: "coudn't sanitize user"})

            return done(null, sanitizedUser, {Message: 'User logged in successfully'})

        } catch(error) {

            return done(error, false, {Message: "Server Error Occured", Error: error})
        }
    }
))
