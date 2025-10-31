"use strict";
exports.__esModule = true;
var redis_js_1 = require("../config/session/redis.js");
var checkRedisConnection = function (req, res, next) {
    if (!redis_js_1.redisConnected) {
        return res.status(503).json({
            message: "Authentication service unavailable. Please try again later.",
            redis: redis_js_1.redisConnected
        });
    }
    return next();
};
exports["default"] = checkRedisConnection;
