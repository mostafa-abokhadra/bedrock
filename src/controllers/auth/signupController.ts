import passport from "../../config/auth/passport.js";
import { IVerifyOptions } from "passport-local";

class signupController {
    static async createNewUser(req: any, res: any, next: any) {

        passport.authenticate(
            'local-signup',
            (err: any, user: object, info: IVerifyOptions) => {

                if (err) return res.status(500).json(info);
                if (!user) return res.status(500).json(info);

                req.logIn(user, (err: any) => {
                    if (err) return res.status(500).json({"message": `Can not Login user`});
                    return res.status(201).json({...info, user: user});
                })
                
        })(req, res, next)
    }
}
export default signupController;