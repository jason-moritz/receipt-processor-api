import { application, Router } from 'express'
import getPoints from '../controllers/get-points.controller'
import getReceipts from '../controllers/get-receipts'
import processReceipt from '../controllers/process-receipt.controller'

const receiptRouter = Router()

// receiptRouter.post('/receipts/process', )
receiptRouter.get('/receipts', getReceipts)
receiptRouter.post('/receipts/process', processReceipt)
receiptRouter.get('/receipts/:id/points', getPoints)

export default receiptRouter