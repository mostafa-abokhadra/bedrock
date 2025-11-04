import { User } from "../models/user.model.js";

export async function sanitizeUser(email: string) {
    try {
        const user = await User.findOne({email}).select("id email")
        if (!user)
            return null
        return user;
    } catch(error) {
        // log the  error below
        // return {
        //     "message": "An error has occured while sanitizing user",
        //     error: error
        // }
        return null
    }
}