const paystack = (req) => {
    const MySecretKey = process.env.PAYSTACK_SECRET_KEY

    const initializePayment = (form, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: `Bearer ${MySecretKey}`,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }, form
        }

        const callback = (err, res, body) => {
            return mycallback(err, body)
        }
        req.post(options, callback)
    }

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/verify' + encodeURIComponent(ref),
            headers: {
                authorization: `Bearer ${MySecretKey}`,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        const callback = (err, res, body) => {
            return mycallback(err, body)
        }
        req(options, callback)
    }
    return { initializePayment, verifyPayment }
}

export default paystack