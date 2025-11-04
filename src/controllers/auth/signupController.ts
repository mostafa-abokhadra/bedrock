import passport from "../../config/auth/passport.js";
import { IVerifyOptions } from "passport-local";

class signupController {
    static async createNewUser(req: any, res: any, next: any) {

        passport.authenticate(
            'local-signup',
            (err: any, user: object, message: IVerifyOptions) => {

                if (err) return res.status(500).json(message);
                if (!user) return res.status(500).json(message);

                req.logIn(user, (err: any) => {
                    if (err) return res.status(500).json({"message": `Can not Login user`});
                    return res.status(201).json({...message, user: user});
                })
                
        })(req, res, next)
    }
}
export default signupController;