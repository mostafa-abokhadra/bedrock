"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const basicAuth_1 = __importDefault(require("./config/basicAuth"));
const session_1 = __importDefault(require("./config/session"));
const loginRoutes_js_1 = __importDefault(require("./routes/loginRoutes.js"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(session_1.default);
server.use(basicAuth_1.default.initialize());
server.use(basicAuth_1.default.session());
server.use('/auth', loginRoutes_js_1.default);
server.get('/', async (req, res) => {
    return res.send("<h1>Bedrock Home page 3</h1>");
});
server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
});
