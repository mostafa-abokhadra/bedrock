import passport from "../../config/auth/passport.js"
import { IVerifyOptions } from "passport-local";

class loginController {
    static async postLogin(req: any , res: any , next: any) {

        passport.authenticate(
            'local-login',
            (err: object | null, user: object, info: IVerifyOptions) => {
                
                if (err) return res.status(500).json(info)
                if (!user)return res.status(500).json(info)

                req.logIn(user, (err: any) => {
                    if (err) return res.status(500).json({"message": "can not login user"});
                    return res.status(200).json({...info, user: user})
                })
            
        })(req, res, next); 
    }

}
export default loginController;