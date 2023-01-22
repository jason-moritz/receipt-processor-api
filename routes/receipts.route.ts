import { application, Router } from 'express'
import getPoints from '../controllers/get-points.controller'
import getReceipts from '../controllers/get-receipts'
import processReceipt from '../controllers/process-receipt.controller'
import MW from '../middleware/index.middleware'

const receiptRouter = Router()

receiptRouter.get('/receipts', MW.authenticateUser, getReceipts)
receiptRouter.post('/receipts/process', MW.authenticateUser, MW.verifyReceiptPayload, processReceipt)
receiptRouter.get('/receipts/:id/points', MW.authenticateUser, getPoints)

export default receiptRouter