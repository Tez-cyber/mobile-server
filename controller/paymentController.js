import PaymentService from "../service/payment.service";

const paymentInstance = new PaymentService()

export default startPayment = async (req, res) => {
    try {
        const response = await paymentInstance.startPayment(req.body)
        res.status(201).json({status: "Success", data: response})
    }catch(error) {
        res.status(500).json({status: "Failed", message: error.message})
    }
}