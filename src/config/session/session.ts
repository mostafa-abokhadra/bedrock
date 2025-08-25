import session from "express-session";
import dotenv from "dotenv"
import sessionStore from './redis.js'

dotenv.config()

const sessionConfig: session.SessionOptions = {
    name: process.env.SESSION_NAME!,
    secret: process.env.SESSION_SECRET!,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}

export default session(sessionConfig);