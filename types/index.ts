export type ItemPayload = {
    shortDescription: string
    price: string
}

export type ReceiptPayload = {
    userID: string
    retailer: string
    purchaseDate: string
    purchaseTime: string
    total: string
    items: ItemPayload[]
}

export type Item = {
    itemID?: string
    categoryID?: string
    category?: string
    shortDescription: string
    price: number
}


export type Receipt = {
    _id?: string
    userID: string
    retailer: string
    retailerID?: string
    purchaseDate: string
    purchaseTime: number
    total: number
    points?: number
    items: Item[]
}
