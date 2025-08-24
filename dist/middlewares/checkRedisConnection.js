import { redisConnected } from "../config/session/redis.js";
const checkRedisConnection = (req, res, next) => {
    if (!redisConnected) {
        return res.status(503).json({
            message: "Authentication service unavailable. Please try again later.",
            redis: redisConnected,
        });
    }
    return next();
};
export default checkRedisConnection;
