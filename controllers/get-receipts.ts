import { Request, Response } from 'express'
import totalReceipts from '../db/data'


const getReceipts = (req: Request, res: Response) => {
    try {
        res.json(totalReceipts)
    } catch(error: any) {
        res.json({ message: error.message })
    }
}

export default getReceipts