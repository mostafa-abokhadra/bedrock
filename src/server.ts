import "dotenv/config";
import express from "express";

const server = express()

server.get('/', (req, res) => {
    return res.send(`<h1>Hello bedrock</h1>`);
})

server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
})
