import passport from "../../config/auth/passport.js";
class signupController {
    static async createNewUser(req, res, next) {
        passport.authenticate('local-signup', (err, user, info) => {
            if (err)
                return res.status(500).json(info);
            if (!user)
                return res.status(500).json(info);
            req.logIn(user, (err) => {
                if (err)
                    return res.status(500).json({ "message": `Can not Login user` });
                return res.status(201).json({ ...info, user: user });
            });
        })(req, res, next);
    }
}
export default signupController;
