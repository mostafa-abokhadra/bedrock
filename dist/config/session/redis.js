import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
const redisClient = createClient({
    url: process.env.REDIS_SESSION_CACHE_URL
});
redisClient.on("error", (err) => {
    console.log("Redis client error", err);
});
await redisClient.connect();
const sessionStore = new RedisStore({ client: redisClient });
if (redisClient.isReady)
    console.log(`i'm ready`);
export default sessionStore;
