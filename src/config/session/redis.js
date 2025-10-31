"use strict";
exports.__esModule = true;
exports.redisConnected = void 0;
var redis_1 = require("redis");
var connect_redis_1 = require("connect-redis");
exports.redisConnected = false;
var redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_SESSION_CACHE_URL
});
redisClient.on("error", function () {
    exports.redisConnected = false;
});
redisClient.on("connect", function () {
    exports.redisConnected = true;
});
try {
    await redisClient.connect();
    exports.redisConnected = true;
}
catch (err) {
    exports.redisConnected = false;
}
var sessionStore = new connect_redis_1.RedisStore({ client: redisClient });
exports["default"] = sessionStore;
