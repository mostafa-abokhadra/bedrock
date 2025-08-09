"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockAuthenticatedUser = void 0;
const blockAuthenticatedUser = (req, res, next) => {
    if (req.user)
        return res.status(400).json({ 'info': 'Already Authenticated' });
    next();
};
exports.blockAuthenticatedUser = blockAuthenticatedUser;
