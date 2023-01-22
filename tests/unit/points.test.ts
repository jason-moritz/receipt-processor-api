import calculatePoints, 
{ getPointsForRetailerName,
  getPointsForRoundTotal,
  getPointsForMultiple,
  getPointsForDate,
  getPointsForTimeRange,
  getPointsForTotalItems,
  getPointsForItemsDescription
 } from "../../helper/calculate-points.helper"
import { testReceipt1, testReceipt2, badReceipt } from "../payloads/receipt.payload"

test('get points for retailer', () => {
  expect(getPointsForRetailerName(testReceipt1)).toBe(6)
  expect(getPointsForRetailerName(testReceipt2)).toBe(14)
  expect(getPointsForRetailerName(badReceipt)).toBe(0)
})

test('get points for round total', () => {
  expect(getPointsForRoundTotal(testReceipt1)).toBe(0)
  expect(getPointsForRoundTotal(testReceipt2)).toBe(50)
  expect(getPointsForRoundTotal(badReceipt)).toBe(0)
})

test('get points for total as multiple', () => {
  expect(getPointsForMultiple(testReceipt1)).toBe(0)
  expect(getPointsForMultiple(testReceipt2)).toBe(25)
  expect(getPointsForMultiple(badReceipt)).toBe(0)
})

test('get points for date', () => {
  expect(getPointsForDate(testReceipt1)).toBe(6)
  expect(getPointsForDate(testReceipt2)).toBe(0)
  expect(getPointsForDate(badReceipt)).toBe(0)
})

test('gets points for time range', () => {
  expect(getPointsForTimeRange(testReceipt1)).toBe(0)
  expect(getPointsForTimeRange(testReceipt2)).toBe(10)
})

test('get points for total items', () => {
  expect(getPointsForTotalItems(testReceipt1.items)).toBe(10)
  expect(getPointsForTotalItems(testReceipt2.items)).toBe(10)
  expect(getPointsForTotalItems(badReceipt.items)).toBe(0)
})

test('get points for item description', () => {
  expect(getPointsForItemsDescription(testReceipt1.items)).toBe(6)
  expect(getPointsForItemsDescription(testReceipt2.items)).toBe(0)
  expect(getPointsForItemsDescription(badReceipt.items)).toBe(0)
})

test('adds up points', () => {
  expect(calculatePoints(testReceipt1)).toBe(28)
  expect(calculatePoints(testReceipt2)).toBe(109)
})
