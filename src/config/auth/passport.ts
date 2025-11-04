import passport from "passport"
import './login.js'
import './signup.js'
import { User } from "../../models/user.model.js"

passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: any, done: any) => {
    const user = await User.findOne({_id: id}).select("id email")
    done(null, user)
})

export default passport;