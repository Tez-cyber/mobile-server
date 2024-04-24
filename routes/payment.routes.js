import express from "express"
import { startPayment, createPayment, getPayment } from "../controller/paymentController.js"
import initializePayment from "../controller/testPaymentController.js"

const router = express.Router()

router.post('/', startPayment)
router.get('/createPayment', createPayment)
router.get('/paymentDetails', getPayment) 
router.post('/acceptpayment', initializePayment.acceptPayment)

export default router