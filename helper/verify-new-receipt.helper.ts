import totalReceipts from "../db/data";
import { Receipt } from "../types/index.type";

// This method would be different if DB was involved as we could compare user id, retailer and date/time if indexed.
const isNewReceipt = (receipt: Receipt) => {
    try {
        console.log('Verifying receipt is not a duplicate...')

        const { retailer, purchaseDate, purchaseTime, } = receipt

        for (const prevReceipt of Object.values(totalReceipts)) {
            const { retailer: prevRetailer, purchaseDate: prevDate, purchaseTime: prevTime } = prevReceipt

            const isSameRetailer = retailer === prevRetailer
            const isSamePurchaseDate = JSON.stringify(purchaseDate) === JSON.stringify(prevDate)
            const isSamePurchaseTime = purchaseTime === prevTime

            // Ideally would need to verify against userID as well, but using uuid library instead of db, it will be unique every time.
            if (isSameRetailer && isSamePurchaseDate && isSamePurchaseTime) {
                console.log('Existing receipt record found.')
                return false
            }
        }
        
    console.log('Record is new.')
    return true
    } catch(error: any) {
        throw new Error(error.message)
    }
}

export default isNewReceipt