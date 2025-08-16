import session from "express-session";
import dotenv from "dotenv";
import sessionStore from './redis.js';
dotenv.config();
const sessionConfig = {
    name: "bedrockCookie",
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore
};
export default session(sessionConfig);
