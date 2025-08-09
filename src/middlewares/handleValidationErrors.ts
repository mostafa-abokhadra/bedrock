import {validationResult} from 'express-validator'

const handleValidationError = (req: any, res: any, next: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}
export default handleValidationError;