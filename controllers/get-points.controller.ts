import { Request, Response } from 'express'
import totalReceipts from '../db/data'

const getPoints = (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // Mimic trace logs.
        console.log(`User ### requesting points for receipt with id ${id}. Querying database...`)
        
        // Simulate DB call
        const receipt = totalReceipts[id]
        
        if (!receipt) {
            console.log(`No record found for id ${id}.`)
            res.json({ message: `No record found for id ${id}.`})
        }
        
        console.log(`Record found for id ${id}.`, JSON.stringify(receipt))
        res.json({ points: receipt.points })
    
    } catch(error: any) {
        console.error(error.message)
        res.json({ message: error.message })
    }
}

export default getPoints