import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local'
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { sanitizeUser } from "../../utils/userUtils.js";
import { User } from "../../models/user.model.js";
const prisma = new PrismaClient()

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done: any) => {
        try {

            const hashPassword = await bcrypt.hash(password, Number(process.env.HASH_SALT!))

            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword
                }
            })
        
            try {
            const mongoUser = await User.create({email, password: hashPassword})
            console.log("raw mongoUser", mongoUser)
            } catch(err) {
                console.log("mongo err", err)
            }
            if (!user)
                return done(null, false, {message: `Can't Create User`})

            const sanitizedUser = await sanitizeUser(user.email)
            return done(null, sanitizedUser, {message: "User Created Successfully"})

        } catch(error) {
            return done(error, false, {Message: "Server Error Occured", Error: error})
        }
    })
)
