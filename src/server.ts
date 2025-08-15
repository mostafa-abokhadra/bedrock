import "dotenv/config";
import express from "express";
import passport from "passport";
import './config/auth/login.js'
import './config/auth/signup.js'
import session from './config/session/session.js'


import loginRoutes from './routes/auth/loginRoutes.js'
import signupRoutes from "./routes/auth/signupRoutes.js";

const server = express()
server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use(session)
server.use(passport.initialize())
server.use(passport.session())

server.use('/auth', loginRoutes);
server.use('/auth', signupRoutes);

server.get('/', async (req, res) => {
    return res.send("<h1>Bedrock Home page 3</h1>");
})

server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
})
