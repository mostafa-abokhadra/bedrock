export const blockAuthenticatedUser = (req, res, next) => {
    if (req.user)
        return res.status(400).json({ 'info': 'Already Authenticated' });
    next();
};
