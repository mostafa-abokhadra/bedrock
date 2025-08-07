"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const session_js_1 = __importDefault(require("./config/session.js"));
const server = (0, express_1.default)();
server.use(session_js_1.default);
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.get('/', async (req, res) => {
    return res.send("<h1>Bedrock Home page</h1>");
});
server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
});
