import passport from "passport"
import './login.js'
import './signup.js'

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: any, done: any) => {

    const user = await prisma.user.findUnique({
        where: {id},
        select: {
            id: true,
            email: true,
            vaults: true
        }
    })
    
    done(null, user)
})

export default passport;