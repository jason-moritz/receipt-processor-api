import totalReceipts from "../db/data";
import { Receipt } from "../types/index.type";

// This method would be different if DB was involved as we could compare user id, retailer and date/time if indexed.
const isNewReceipt = (receipt: Receipt) => {
    console.log('Verifying receipt is not a duplicate...')

    let isNew = true
    for (const prevReceipt of Object.values(totalReceipts)) {
        const isDuplicate = JSON.stringify(receipt) === JSON.stringify(prevReceipt)

        if (isDuplicate) {
            isNew = false
            console.log('Existing receipt record found.')
            break
        }
    }
    console.log('Record is new.')
    return isNew
}

export default isNewReceipt