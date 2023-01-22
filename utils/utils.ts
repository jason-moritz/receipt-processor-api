import { faker } from '@faker-js/faker'

const trimNonAlphanumeric = (str: string) => {
    const trimmed = str.replace(/[^0-9A-Z]+/gi,"")
    return trimmed
}

const getRandomID = () => {
    return faker.random.alphaNumeric(10)
}

export default {
    trimNonAlphanumeric,
    getRandomID
}
