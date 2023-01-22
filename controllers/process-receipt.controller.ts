import { faker } from '@faker-js/faker'
import { Request, Response } from 'express'
import { valid } from 'joi'
import { v4 as uuidv4 } from 'uuid'
import totalReceipts from '../db/data'
import formatReceipt from '../helper/format-receipt.helper'
import Helper from '../helper/index.helper'
import Schema from '../schemas/index.schema'
import { Receipt } from '../types/index.type'
import Utils from '../utils/utils'

const processReceipt = (req: Request, res: Response) => {
    try {
        const receipt = req.body

        // Mimic trace logs
        console.log('Begin processing receipt...', JSON.stringify(receipt))

        // Appending userID to mock metadata attached to receipt payload. 
        receipt.userID = Utils.getRandomID()

        // Check for duplicate record
        const isNew = Helper.isNewReceipt(receipt)

        if (!isNew) {
            res.json({ message: 'Existing receipt record found.' })
        }

        // Format receipt for db storage
        const formattedReceipt: Receipt = Helper.formatReceipt(receipt)

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
            res.json({ message: 'Failed final validation', error: validated.error })
        } 
        
        console.log('Receipt successfully validated. Storing in db...', formattedReceipt)

        const newID = uuidv4()
        formattedReceipt._id = newID  
        totalReceipts[newID] = formattedReceipt
        
        res.json({ _id: formattedReceipt._id })
    } catch(error: any) {
        console.error('Error processing receipts.')
        res.json({ message: error.message })
    }
}

export default processReceipt