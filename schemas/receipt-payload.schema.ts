import Joi from 'joi'

const ItemPayload = Joi.object({
    shortDescription: Joi.string().required(),
    price: Joi.number().required()
})

const ReceiptPayload = Joi.object({
    userID: Joi.string().required(),
    retailer: Joi.string().required(),
    purchaseDate: Joi.date().required(),
    purchaseTime: Joi.string().required(),
    items: Joi.array().items(ItemPayload).min(1).required(),
    total: Joi.number().min(0.01).required(),
})

export default ReceiptPayload