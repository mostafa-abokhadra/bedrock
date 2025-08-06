import "dotenv/config";
import express from "express";

const server = express()

server.get('/', async (req, res) => {
    return res.send("<h1>Bedrock Home Page</h1>");
})

server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
})
