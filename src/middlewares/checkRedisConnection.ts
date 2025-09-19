import { redisConnected } from "../config/session/redis.js";
import { Request as Req, Response as Res, NextFunction as Next } from "express";
const checkRedisConnection = (req: Req, res: Res, next: Next) => {
    if (!redisConnected) {
            return res.status(503).json({
            message: "Authentication service unavailable. Please try again later.",
            redis: redisConnected,
        });
    }
    return next()
}

export default checkRedisConnection;