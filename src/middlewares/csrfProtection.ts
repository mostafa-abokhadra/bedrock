import csurf from "csurf";
import { Request as Req, Response as Res, NextFunction as Next } from "express";
const csrfProtection = csurf();

const csrfMiddleware = (req: Req, res: Res, next: Next) => {
    csrfProtection(req, res, (err) => {
        if (err && err.code === 'EBADCSRFTOKEN') {
            return res.status(403).json({ message: 'Invalid CSRF Token' });
        }
        return next();
    });
}
export default csrfMiddleware;