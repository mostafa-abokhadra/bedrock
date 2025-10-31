"use strict";
exports.__esModule = true;
exports.isAuthenticated = exports.blockAuthenticatedUser = void 0;
var blockAuthenticatedUser = function (req, res, next) {
    if (req.user)
        return res.status(409).json({ 'message': 'Already Authenticated' });
    return next();
};
exports.blockAuthenticatedUser = blockAuthenticatedUser;
var isAuthenticated = function (req, res, next) {
    if (req.user)
        return next();
    return res.status(403).json({ "message": "User Not Authenticated" });
};
exports.isAuthenticated = isAuthenticated;
