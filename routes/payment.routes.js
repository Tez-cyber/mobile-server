import express from "express"
import { startPayment, createPayment, getPayment } from "../controller/paymentController.js"

const router = express.Router()

router.post('/', startPayment)
router.get('/createPayment', createPayment)
router.get('/paymentDetails', getPayment)

export default router