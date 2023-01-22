import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import totalReceipts from '../db/data'
import Helper from '../helper/index.helper'
import Schema from '../schemas/index.schema'
import { Receipt } from '../types/index.type'
import Utils from '../utils/utils'

const processReceipt = (req: Request, res: Response) => {
    try {
        const receipt = req.body

        // Mimic trace logs
        console.log('Begin processing receipt...', JSON.stringify(receipt))

        // Format receipt for db storage
        const formattedReceipt: Receipt = Helper.formatReceipt(receipt)
        
        // Check for duplicate record
        const isNew = Helper.isNewReceipt(formattedReceipt)

        if (!isNew) {
            console.error('Exiting process...')
            res.status(409).json({ message: 'Existing receipt record found.' })
            return
        }

        // Calculate points total
        formattedReceipt.points =  Helper.calculatePoints(formattedReceipt)

        // Simulate querying for existing retailer record
        formattedReceipt.retailerID = Helper.findRetailer(formattedReceipt)

        for (let item of formattedReceipt.items) {
            // Simulate querying items collection for existing item/category
            item = Helper.findItem(item)
        }

        console.log('Validating receipt before storing...')
        const validated = Schema.Receipt.validate(formattedReceipt)
        
        if (validated.error) {
            console.error('Exiting proces...')
            res.status(403).json({ message: 'Failed final validation.', error: validated.error })
            return
        } 
        
        const newID = uuidv4()
        formattedReceipt._id = newID  
        totalReceipts[newID] = formattedReceipt
        
        console.log('Receipt successfully validated. Storing in db...', formattedReceipt)
        res.json({ _id: formattedReceipt._id })
    } catch(error: any) {
        console.error('Error processing receipts.')
        res.json({ message: error.message })
    }
}

export default processReceipt