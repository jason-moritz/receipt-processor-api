import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'
import moment from 'moment'
import Schema from '../schemas/index.schema'
import { Receipt , Item } from '../types/index.type'
import Utils from '../utils/utils'
import Helper from '../helper/index.helper'

const totalReceipts: any = {}

// Function to "seed" the "database"
export const insertData = (dataAmount: number) => {
    try {
        for (let i = 0; i < dataAmount; i++) {
            // Build items for each receipt (range 1 - 5)
            const items = []
            const itemCount = Math.ceil(Math.random() * 3)
            let totalPrice = 0
    
            for (let i = 0; i < itemCount; i++) {
                const item: Item = {
                    itemID: Utils.getRandomID(),
                    category: faker.commerce.product(),
                    categoryID: Utils.getRandomID(),
                    shortDescription: faker.commerce.productDescription(),
                    price: parseFloat(faker.finance.amount(1, 1000))
                }
                
                const validatedItem = Schema.Item.validate(item)
    
                if (!validatedItem.error) {
                    items.push(item)
                    totalPrice += item.price
                } else {
                    console.error(validatedItem.error)
                    return
                }
            }
            
            // Build receipt and attach items
            const receipt: Receipt = {
                _id: uuidv4(),
                userID: Utils.getRandomID(),
                retailer: faker.company.name(),
                retailerID: Utils.getRandomID(),
                purchaseDate: faker.date.recent(5, '2023-01-01T00:00:00.000Z'),
                purchaseTime: Math.floor(Math.random() * 2399),
                total: parseFloat(totalPrice.toFixed(2)),
                items: items
            }
    
            const validatedReceipt = Schema.Receipt.validate(receipt)
    
            if (!validatedReceipt.error) {
                receipt.points = Helper.calculatePoints(receipt)
                totalReceipts[receipt._id!] = receipt
            } else {
                console.error(validatedReceipt.error)
                return
            }
        }
                    
        console.log(`Successfully created ${Object.keys(totalReceipts).length} records.`)
    } catch(error: any) {
        console.error(error.message)
    }
}

export default totalReceipts
