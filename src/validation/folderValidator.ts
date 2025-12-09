import { param } from "express-validator";

const vaultIdValidator = [
    param("vaultId")
    .not().isEmpty().withMessage("vault id is required")
]