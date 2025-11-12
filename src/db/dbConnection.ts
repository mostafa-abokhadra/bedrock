import mongoose from "mongoose";

export async function connectDb () {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION!)
        console.log("do i got here")
    } catch(error) {
        console.log("what about here")
        console.log("mongo connection failed", error)
        process.exit(1)
    }
}
