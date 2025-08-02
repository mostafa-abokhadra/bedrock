"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
server.get('/', (req, res) => {
    return res.send(`<h1>Hello bedrock</h1>`);
});
server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
});
