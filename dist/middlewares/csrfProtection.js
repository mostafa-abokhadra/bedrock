import csurf from "csurf";
const csrfProtection = csurf();
const csrfMiddleware = (req, res, next) => {
    csrfProtection(req, res, (err) => {
        if (err && err.code === 'EBADCSRFTOKEN') {
            return res.status(403).json({ message: 'Invalid CSRF Token' });
        }
        return next();
    });
};
export default csrfMiddleware;
