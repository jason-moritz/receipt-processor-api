import { faker } from '@faker-js/faker'
import { Request, Response } from 'express'
import { valid } from 'joi'
import { v4 as uuidv4 } from 'uuid'
import totalReceipts from '../db/data'
import formatReceipt from '../helper/format-receipt.helper'
import Helper from '../helper/index.helper'
import Schema from '../schemas/index.schema'
import { Receipt } from '../types'
import Utils from '../utils/utils'

const processReceipt = (req: Request, res: Response) => {
    try {
        const receipt = req.body

        console.log('Begin processing receipt...', JSON.stringify(receipt))

        // Appending userID to mock metadata. Assuming only users are permitted to post and user ID is sent via metadata.
        receipt.userID = Utils.getRandomID()

        // Check for duplicate record
        console.log('Verifying receipt is not a duplicate...')
        const isNew = Helper.isNewReceipt(receipt)

        if (!isNew) {
            console.log('Existing receipt record found.')
            res.json({ message: 'Existing receipt record found.' })
        }

        // Format receipt for db storage
        const formattedReceipt: Receipt = Helper.formatReceipt(receipt)

        // Calculate points total
        console.log('Calculating points...')
        formattedReceipt.points =  Helper.calculatePoints(formattedReceipt)
        console.log('Total points: ', formattedReceipt.points)

        // Simulate querying for existing retailer record
        // If retailer exists in db, add retailer ID
        console.log('Checking if retailer record exists....')
        formattedReceipt.retailerID = Utils.getRandomID()
        console.log(`Retailer record found: ${receipt.retailerID}.`)

        for (const item of formattedReceipt.items) {
            // Simulate querying for existing item/category
            console.log('Checking if item record exists...')
            item.itemID = Utils.getRandomID()
            console.log(`Item record found: ${item.itemID}.`)

            console.log('Checking if item category record exists...')
            item.category = faker.commerce.product()
            console.log(`Item category record found: ${item.category}.`)

            console.log('Checking if record of category ID exists....')
            item.categoryID = Utils.getRandomID()
            console.log(`Item categoryID record found: ${item.categoryID}.`)
        }

        console.log('Validating receipt before storing...')
        const validated = Schema.Receipt.validate(formattedReceipt)
        
        if (!validated.error) {
            console.log('Receipt successfully validated. Storing in db...', formattedReceipt)

            const newID = uuidv4()
            formattedReceipt._id = newID  
            totalReceipts[newID] = formattedReceipt
            
            res.json({ _id: formattedReceipt._id })
        } else {
            res.json({ message: 'Failed final validation', error: validated.error })
        }
    } catch(error: any) {
        console.log('Error processing receipts.')
        res.json({ message: error.message })
    }
}

export default processReceipt