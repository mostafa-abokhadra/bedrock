export const blockAuthenticatedUser = (req, res, next) => {
    if (req.user)
        return res.status(400).json({ 'info': 'Already Authenticated' });
    return next();
};
export const isAuthenticated = (req, res, next) => {
    if (req.user)
        return next();
    return res.status(500).json({ "message": "User Not Authenticated" });
};
