import swaggerUi from 'swagger-ui-express'
import express from 'express'
import YAML from 'yamljs'
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()
const swaggerDoc = YAML.load(path.resolve(__dirname, '../../dist/docs/openapi-bundled.yaml'))

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, {
        customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
        customCssUrl: CSS_URL,
    })
)

export default router;