import Joi from 'joi'
import Item from './item.schema'
// Assumed for only purchases, not including returns creating a negative total amount.


const Receipt = Joi.object({
    _id: Joi.string(),
    userID: Joi.string().required(),
    retailer: Joi.string().required(),
    retailerID: Joi.string(),
    purchaseDate: Joi.date().required(),
    purchaseTime: Joi.number().min(0).max(2399).required(),
    items: Joi.array().items(Item).min(1).required(),
    total: Joi.number().min(0.01).required(),
    points: Joi.number()
})

export default Receipt