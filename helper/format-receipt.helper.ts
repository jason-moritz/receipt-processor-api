import { ReceiptPayload } from "../types/index.type";
import moment from 'moment'

const formatReceipt = (receipt: ReceiptPayload) => {
    try {
        console.log('Attempting to format receipt payload...')

        // Format date to ISO (assuming db has dateTime type)
        const formattedDate = new Date(receipt.purchaseDate + ' ' + receipt.purchaseTime)
        
        // Format time to integer
        const formattedTime = Number(receipt.purchaseTime.split(':').join(''))

        // Format total to float
        const formattedTotal = parseFloat(receipt.total)

        // Format item prices to float
        const formattedItems = []

        for (const item of receipt.items) {
            const formattedDescription = item.shortDescription.trim()
            const formattedPrice = Number(item.price)

            const formattedItem = {
                itemID: '',
                categoryID: '',
                category: '',
                shortDescription: formattedDescription,
                price: formattedPrice
            }

            formattedItems.push(formattedItem)
        }

        // Create formatted receipt payload
        const formattedReceipt = {
            userID: receipt.userID,
            retailer: receipt.retailer,
            retailerID: '',
            purchaseDate: formattedDate,
            purchaseTime: formattedTime,
            total: formattedTotal,
            points: 0,
            items: formattedItems,
        }

        console.log('Successfully formatted receipt payload.')

        return formattedReceipt
    } catch(error: any) {
        throw new Error(error.message)
    }
}

export default formatReceipt