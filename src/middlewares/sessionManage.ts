import { Request as Req, Response as Res, NextFunction as Next } from "express"
export const blockAuthenticatedUser = (req: Req, res: Res, next: Next) => {
    if (req.user)
        return res.status(400).json({'info': 'Already Authenticated'})
    return next()
}