import mongoose from "mongoose";

export async function connectDb () {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION!)
    } catch(error) {
        console.log("mongo connection failed", error)
        process.exit(1)
    }
}
