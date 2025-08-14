import { createClient } from 'redis'
import  {RedisStore}  from 'connect-redis'

    const redisClient = createClient({
        url: 'redis://localhost:6379'
        // 'redis://username:password@host:port/db-number'
    })

    redisClient.on("error", (err) => {
        console.log("Redis client error", err)
    })

    await redisClient.connect()

    const  sessionStore = new RedisStore({client: redisClient});

    if (redisClient.isReady)
        console.log(`i'm ready`)
    

export default sessionStore;