import { Router } from 'express'
import dockerRouter from './docker-health.route'
import receiptRouter from './receipts.route'

const mainRouter = Router()

mainRouter.use('/', receiptRouter)
mainRouter.use('/', dockerRouter)

export default mainRouter