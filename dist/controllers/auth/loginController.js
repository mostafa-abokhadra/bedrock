import passport from "../../config/auth/passport.js";
class loginController {
    static async postLogin(req, res, next) {
        passport.authenticate('local-login', (err, user, info) => {
            if (err)
                return res.status(500).json(info);
            if (!user)
                return res.status(400).json(info);
            req.logIn(user, (err) => {
                if (err)
                    return res.status(500).json({ "message": "can not login user" });
                return res.status(200).json({ ...info, user: user });
            });
        })(req, res, next);
    }
    static async logout(req, res, next) {
        req.logout((err) => {
            if (err)
                return res.status(500).json({ "message": `can not logout the user` });
            req.session.destroy((err) => {
                if (err)
                    return res.status(500).json({ "message": "can not destory the session" });
            });
            res.clearCookie("sessionId");
            res.clearCookie("_csrf");
            return res.status(200).json({ "message": "logged out successfully" });
        });
    }
}
export default loginController;
