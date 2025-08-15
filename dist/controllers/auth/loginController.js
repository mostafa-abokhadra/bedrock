import passport from "passport";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class loginController {
    static async postLogin(req, res, next) {
        const user = await new Promise((resolve, reject) => {
            passport.authenticate('local-login', (err, user, info) => {
                if (err)
                    return reject(err);
                if (!user)
                    return reject(info.message);
                req.logIn(user, (err) => {
                    if (err)
                        return reject(err);
                    resolve(user);
                });
            })(req, res, next);
        });
        return res.status(200).json({
            'info': "User Authenticated Successfully",
            user: user
        });
    }
}
export default loginController;
