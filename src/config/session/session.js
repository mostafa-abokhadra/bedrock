"use strict";
exports.__esModule = true;
var express_session_1 = require("express-session");
var redis_js_1 = require("./redis.js");
var sessionConfig = {
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
    store: redis_js_1["default"],
    proxy: process.env.NODE_ENV === 'production'
};
exports["default"] = (0, express_session_1["default"])(sessionConfig);
