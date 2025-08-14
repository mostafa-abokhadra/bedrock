import "dotenv/config";
import express from "express";
import passport from './config/basicAuth.js';
import session from './config/session.js';
import loginRoutes from './routes/loginRoutes.js';
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(session);
server.use(passport.initialize());
server.use(passport.session());
server.use('/auth', loginRoutes);
server.get('/', async (req, res) => {
    return res.send("<h1>Bedrock Home page 3</h1>");
});
server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
});
