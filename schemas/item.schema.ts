import Joi from 'joi'

const Item = Joi.object({
    itemID: Joi.string(),
    category: Joi.string(),
    categoryID: Joi.string(),
    shortDescription: Joi.string().required(),
    price: Joi.number().required()
})

export default Item