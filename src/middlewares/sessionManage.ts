export const blockAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated())
        return res.status(400).json({'info': 'Already Authenticated'})
}