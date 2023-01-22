import { Receipt } from "../../types";
import Utils from '../../utils/utils'

export const testReceipt1: Receipt = {
    userID: Utils.getRandomID(),
    retailer: 'Target',
    purchaseDate: '2022-01-01T19:01:00.000Z',
    purchaseTime: 1301,
    items: [
      {
        shortDescription: 'Mountain Dew 12PK',
        price: 6.49,
      },
      {
        shortDescription: 'Emils Cheese Pizza',
        price: 12.25,
      },
      {
        shortDescription: 'Knorr Creamy Chicken',
        price: 1.26,
      },
      {
        shortDescription: 'Doritos Nacho Cheese',
        price: 3.35,
      },
      {
        shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
        price: 12.0,
      },
    ],
    total: 35.35,
  }

export const testReceipt2: Receipt = {
    userID: Utils.getRandomID(),
    retailer: "M&M Corner Market",
    purchaseDate: "2022-03-20T19:33:00.000Z",
    purchaseTime: 1433,
    items: [
      {
        shortDescription: "Gatorade",
        price: 2.25
      },{
        shortDescription: "Gatorade",
        price: 2.25
      },{
        shortDescription: "Gatorade",
        price: 2.25
      },{
        shortDescription: "Gatorade",
        price: 2.25
      }
    ],
    total: 9.00
  }

  export const badReceipt: Receipt = {
    userID: Utils.getRandomID(),
    retailer: "",
    purchaseDate: "",
    purchaseTime: 2500,
    items: [],
    total: 0
  }