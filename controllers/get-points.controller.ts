import { Request, Response } from 'express'
import totalReceipts from '../db/data'

const getPoints = (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // Mimic trace logs.
        console.log(`User ### requesting points for receipt with id ${id}. Querying database...`)
        
        // Simulate DB call
        const receipt = totalReceipts[id]
        
        if (receipt && receipt.points) {
            console.log(`Record found for id ${id}.`, JSON.stringify(receipt))
            res.json({ points: receipt.points })
        } else {
            console.log(`No record found for id ${id}.`)
            res.json({ message: `No record found for id ${id}.`})
        }
    
    } catch(error: any) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

export default getPoints