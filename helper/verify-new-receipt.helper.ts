import totalReceipts from "../db/data";
import { Receipt } from "../types";

// This method would be different if DB was involved as we could compare user id, retailer and date/time if indexed.
const isNewReceipt = (receipt: Receipt) => {
    let isNew = true
    for (const prevReceipt of Object.values(totalReceipts)) {
        const isDuplicate = JSON.stringify(receipt) === JSON.stringify(prevReceipt)

        if (isDuplicate) {
            isNew = false
            break
        }
    }
    return isNew
}

export default isNewReceipt