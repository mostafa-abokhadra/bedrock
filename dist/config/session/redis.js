import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
export let redisConnected = false;
const redisClient = createClient({
    url: process.env.REDIS_SESSION_CACHE_URL,
    socket: {
        reconnectStrategy: false,
    },
});
redisClient.on("error", () => {
    redisConnected = false;
});
redisClient.on("connect", () => {
    redisConnected = true;
});
try {
    await redisClient.connect();
    redisConnected = true;
}
catch (err) {
    redisConnected = false;
}
const sessionStore = new RedisStore({ client: redisClient });
export default sessionStore;
