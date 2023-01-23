import { Request, Response } from 'express'
import totalReceipts from '../db/data'


const getReceipts = (req: Request, res: Response) => {
    try {
        if (!Object.keys(totalReceipts).length) {
            return res.json({ message: 'No receipts found.'})
        }

        // If utilizing a DB, would add offset and limit parameters for pagination > db.collection.skip(offset).limit(limit)
        res.json(totalReceipts)
    } catch(error: any) {
        res.json({ message: error.message })
    }
}

export default getReceipts