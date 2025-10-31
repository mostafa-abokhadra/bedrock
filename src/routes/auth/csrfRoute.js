"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
var csrfProtection_js_1 = require("../../middlewares/csrfProtection.js");
router.get('/csrf-token', csrfProtection_js_1["default"], function (req, res) {
    return res.json({ csrfToken: req.csrfToken() });
});
exports["default"] = router;
