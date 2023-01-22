import { faker } from "@faker-js/faker";
import { Receipt } from "../types/index.type";
import Utils from '../utils/utils'

const findRetailer = (receipt: Receipt) => {
    console.log('Checking if retailer record exists....')
    
    // Query retailer collection > if found attach ID else add new record to retailer collection
    const found = faker.datatype.boolean()
    const trimmedRetailer = receipt.retailer.trim()

    if (!found) {
        console.log(`No retailer record found. Adding ${trimmedRetailer} to collection`)
    } else {
        console.log(`Retailer record found. Adding retailer id.`)
    }

    return Utils.getRandomID()
}

export default findRetailer