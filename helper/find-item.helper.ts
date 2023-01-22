import { faker } from "@faker-js/faker";
import { Item } from "../types/index.type";
import Utils from '../utils/utils'

const findItem = (item: Item) => {
    console.log('Checking if item record exists...')
    
    // Query items collection > if found attach ID and category else add new record to items collection
    const found = faker.datatype.boolean()
    const trimmedDescription = item.shortDescription.trim()

    if (!found) {
        console.log(`No item record found. Adding ${trimmedDescription} to collection...`)
    } else {
        console.log(`Item record found. Adding item id, category id, and category...`)
    }
    
    item.itemID = Utils.getRandomID()
    item.category = faker.commerce.product()
    item.categoryID = Utils.getRandomID()
    return item
}

export default findItem