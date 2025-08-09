export const blockAuthenticatedUser = (req: any, res: any, next: any) => {
    if (req.user)
        return res.status(400).json({'info': 'Already Authenticated'})
    next()
}