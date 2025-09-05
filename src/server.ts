import "dotenv/config";
import express from "express";
import passport from "./config/auth/passport.js";
import session from './config/session/session.js'
import csrfMiddleware from "./middlewares/csrfProtection.js";
import { isAuthenticated } from "./middlewares/sessionManage.js";

import apiDocsRoute from './utils/swagger.js'
import loginRoutes from './routes/auth/loginRoutes.js'
import signupRoutes from "./routes/auth/signupRoutes.js";
import csrfRoutes from "./routes/auth/csrfRoute.js";
import cors from "cors";

const server = express()
server.set('trust proxy', 1);
server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use(cors({
    origin:  true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

server.use(session)
server.use(passport.initialize())
server.use(passport.session())

server.use((req, res, next) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session:', req.session);
    next();
});
server.get('/debug-session', (req, res) => {
    res.json({
        sessionId: req.sessionID,
        sessionExists: !!req.session,
        cookies: req.headers.cookie,
        headers: req.headers,
        secure: req.secure,
        hostname: req.hostname
    });
});

// Add this to check if cookies are being set
server.use((req, res, next) => {
    res.on('finish', () => {
        console.log('Response headers:', res.getHeaders());
    });
    next();
});
server.use('/auth', loginRoutes);
server.use('/auth', signupRoutes);
server.use('/auth', csrfRoutes);
server.use('/', apiDocsRoute);

server.get('/', async (req, res) => {
    return res.send("<h1>Bedrock Home page 3</h1>");
})

server.post('/test', csrfMiddleware, isAuthenticated, (req, res) => {
    return res.json({message: "post request received", body: req.body, session: req.session})
}) 

server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
})
