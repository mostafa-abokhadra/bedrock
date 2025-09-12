import session from "express-session";
import sessionStore from './redis.js';
const sessionConfig = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    proxy: process.env.NODE_ENV === 'production'
};
export default session(sessionConfig);
