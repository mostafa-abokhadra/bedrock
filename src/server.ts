import "dotenv/config";
import express from "express";
import sessionMiddleware from "./config/session.js"

const server = express()
server.use(sessionMiddleware)

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.get('/', async (req, res) => {
    return res.send("<h1>Bedrock Home page 3</h1>");
})

server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
})
