import passport from "passport"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class loginController {
    static async postLogin(req: any , res: any , next: any) {
        passport.authenticate('local-login', (err: object | null, user: object, info: object) => {
            if (err || !user)
                return res.status(500).json(info)
            req.logIn(user, (err: any) => {
                if (err)
                    return res.status(500).json(`Can't Login User`)
            })
            return res.status(200).json({
                'info': "User Authenticated Successfully",
                user: user
            })
        })(req, res, next);
    }
}
export default loginController;