import passport from "../../config/auth/passport.js"
import { IVerifyOptions } from "passport-local";

class loginController {
    static async postLogin(req: any , res: any , next: any) {

        passport.authenticate(
            'local-login',
            (err: object | null, user: object, info: IVerifyOptions) => {
                
                if (err) return res.status(500).json(info)
                if (!user) return res.status(400).json(info)

                req.logIn(user, (err: any) => {
                    if (err) return res.status(500).json({"message": "can not login user"});
                    return res.status(200).json({...info, user: user})
                })
            
        })(req, res, next); 
    }

    static async logout(req: any, res: any, next: any) {
        req.logout((err: any) => {
            if (err)
                return res.status(500).json({"message": `can not logout the user`});

            req.session.destroy((err: any) => {
                if (err)
                    return res.status(500).json({"message": "can not destory the session"})
            })

            res.clearCookie("sessionId")
            res.clearCookie("_csrf");

            return res.status(200).json({"message": "logged out successfully"})
        })
    }
}
export default loginController;