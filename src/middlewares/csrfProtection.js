"use strict";
exports.__esModule = true;
var csurf_1 = require("csurf");
var csrfProtection = (0, csurf_1["default"])();
var csrfMiddleware = function (req, res, next) {
    csrfProtection(req, res, function (err) {
        if (err && err.code === 'EBADCSRFTOKEN') {
            return res.status(403).json({ message: 'Invalid CSRF Token' });
        }
        return next();
    });
};
exports["default"] = csrfMiddleware;
