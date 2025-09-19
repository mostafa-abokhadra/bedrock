export const blockAuthenticatedUser = (req, res, next) => {
    if (req.user)
        return res.status(409).json({ 'message': 'Already Authenticated' });
    return next();
};
export const isAuthenticated = (req, res, next) => {
    if (req.user)
        return next();
    return res.status(403).json({ "message": "User Not Authenticated" });
};
