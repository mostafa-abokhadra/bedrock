"use strict";
exports.__esModule = true;
var swagger_ui_express_1 = require("swagger-ui-express");
var express_1 = require("express");
var yamljs_1 = require("yamljs");
var url_1 = require("url");
var path_1 = require("path");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1["default"].dirname(__filename);
var router = express_1["default"].Router();
var swaggerDoc = yamljs_1["default"].load(path_1["default"].resolve(__dirname, '../../src/docs/swagger.yaml'));
var CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
router.use('/api-docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swaggerDoc, {
    customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL
}));
exports["default"] = router;
