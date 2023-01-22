import { RequestHandler } from "express";
import Schema from '../schemas/index.schema'

const verifyReceiptPayload: RequestHandler = (req, res, next) => {
    try {
        console.log('Verifying initial payload has all required fields...')
        const receipt = req.body
        const validated = Schema.ReceiptPayload.validate(receipt)

        if (!validated.error) {
            console.log('Successfully verified initial payload.')
            next()
        } else {
            console.error(validated.error)
            res.status(403).json({ message: validated.error })
        }
    } catch(error: any) {
        console.error(error.message)
        res.json({ message: error.message })
    }
}

export default verifyReceiptPayload