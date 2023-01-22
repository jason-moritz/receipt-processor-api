import moment from 'moment'
import { Item, Receipt } from "../types"
import Enum from '../enums/index.enum'
import Utils from "../utils/utils"

const calculatePoints = (receipt: Receipt) => {
    if (!receipt || !receipt.items || !receipt.items.length) {
        console.log('Invalid receipt payload.')
        return 0
    }

    console.log('Starting points calculation...')
    let totalPoints = 0

    totalPoints += getPointsForRetailerName(receipt)
    totalPoints += getPointsForRoundTotal(receipt)
    totalPoints += getPointsForMultiple(receipt)
    totalPoints += getPointsForDate(receipt)
    totalPoints += getPointsForTimeRange(receipt)
    totalPoints += getPointsForTotalItems(receipt.items)
    totalPoints += getPointsForItemsDescription(receipt.items)

    return totalPoints
}

// Helper functions to calculate points per specific fields and criteria

// Receipt
export const getPointsForRetailerName = (receipt: Receipt) => {
    if (!receipt || !receipt.retailer) {
        console.log('Invalid receipt payload.')
        return 0
    }

    console.log('Calculating points for retailer name...')

    const { retailer } = receipt 
    const points = Utils.trimNonAlphanumeric(retailer).length

    if (points) {
        console.log(`Adding ${points} points for retailer name.`)
    } else {
        console.log('0 points for retailer name.')
    }

    return points
}

export const getPointsForRoundTotal = (receipt: Receipt, points: number = Enum.defaultPoints.roundedTotal) => {
    if (!receipt || !receipt.total) {
        console.log('Invalid receipt payload.')
        return 0
    }

    console.log('Calculating points for round total...')

    const { total } = receipt
    const isRound = total > 0 && total % 1 === 0

    if (isRound) {
        console.log(`Adding ${points} points for rounded total.`)
        return points
    } else {
        console.log('0 points for round total.')
        return 0
    }
}

export const getPointsForMultiple = (receipt: Receipt, multiple: number = .25, points: number = Enum.defaultPoints.totalIsMultiple) => {
    if (!receipt || !receipt.total) {
        console.log('Invalid receipt payload.')
        return 0
    }

    console.log('Calculating points for multiple...')

    const { total } = receipt
    const isMultiple = total > 0 && total % multiple === 0

    if (isMultiple) {
        console.log(`Adding ${points} pts for multiple.`)
        return points
    } else {
        console.log('0 points for multiple.')
        return 0
    }
}

// Assuming date is format of YYYY-MM-DD as string
export const getPointsForDate = (receipt: Receipt, points: number = Enum.defaultPoints.day, odd: boolean = true) => {
    if (!receipt || !receipt.purchaseDate || !receipt.purchaseDate.length) {
        console.log('Invalid receipt payload.')
        return 0
    }

    console.log('Calculating points for date...')

    const { purchaseDate } = receipt
    const dayAsNumber = Number(moment(purchaseDate).format('DD'))
    
    if (odd) {
        if (dayAsNumber % 2 !== 0) {
            console.log(`Adding ${points} pts for odd day.`)
            return points
        } else {
            console.log('0 points for odd day.')
            return 0
        }
    } else {
        if (dayAsNumber % 2 === 0) {
            console.log(`Adding ${points} pts for even day.`)
            return points
        } else {
            console.log('0 points for even day.')
            return 0
        }
    }
}

// Assuming time is ISO 8601 format
export const getPointsForTimeRange = (receipt: Receipt, start: number = 1400, end: number = 1600, points: number = Enum.defaultPoints.timeOfPurchase) => {
    if (!receipt || !receipt.purchaseTime || !receipt.purchaseTime) {
        console.log('Invalid receipt payload.')
        return 0
    }

    console.log('Calculating points for time range...')

    const { purchaseTime } = receipt
    const isValidTime = purchaseTime > start && purchaseTime < end

    if (isValidTime) {
        console.log(`Adding ${points} pts for time range.`)
        return points
    } else {
        console.log('0 points for time range.')
        return 0
    }
}

// Items
export const getPointsForTotalItems = (items: Item[], interval: number = 2, points: number = Enum.defaultPoints.itemCount) => {
    if (!items || !items.length) {
        console.log('Invalid receipt payload.')
        return 0
    }

    const multiplier = Math.floor(items.length / interval)
    const isValidLength = multiplier > 0

    if (isValidLength) {
        console.log(`Adding ${points * multiplier} pts for total items.`)
        return points * multiplier
    } else {
        console.log('0 points for total items.')
        return 0
    }
}

export const getPointsForItemsDescription = (items: Item[], multiple: number = 3, multiplier: number = .2, roundUp: boolean = true) => {
    if (!items || !items.length) {
        console.log('Invalid receipt payload.')
        return 0
    }

    let points = 0

    for (const item of items) {
        if (!item.shortDescription || !item.price) continue

        const { shortDescription, price } = item
        const trimmedDescription = shortDescription.trim()
    
        const isMultiple = trimmedDescription.length % multiple === 0
    
        if (isMultiple) {
            if (roundUp) {
                console.log(`Adding ${price * multiplier} points for item description.`)
                points += Math.ceil(price * multiplier)
            } else {
                console.log(`Adding ${price * multiplier} points for item description.`)
                points += Math.floor(price * multiplier)
            }
        } else {
            console.log('0 points for item description.')
        }
    }

    return points
}

export default calculatePoints