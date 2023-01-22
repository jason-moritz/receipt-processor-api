import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import mainRouter from './routes/index.route'
import totalReceipts, { insertData } from './db/data'

const app = express()
const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'

app.use(cors())
app.use(express.json())
app.use(logger('tiny'))
app.use('/api/v1', mainRouter)

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}.`)
    
    if (ENV === 'development') {
        console.log('Attempting to create seed data...')
        const seedDataCount = insertData(10)
        if (seedDataCount) {
            console.log(`Successfully created ${seedDataCount} records.`)
        }
    }
})
