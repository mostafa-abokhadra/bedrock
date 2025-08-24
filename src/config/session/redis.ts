import { createClient } from 'redis'
import  {RedisStore}  from 'connect-redis'

export let redisConnected = true;

const redisClient = createClient({
    url: process.env.REDIS_SESSION_CACHE_URL
})
redisClient.on("error", () => {
    redisConnected = false
})

redisClient.on("connect", () => {
    redisConnected = true
})

await redisClient.connect()

const  sessionStore = new RedisStore({client: redisClient});
    
export default sessionStore;