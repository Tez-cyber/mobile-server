import request from "request"
import Payment from "../model/payment.js"
import lodash from "lodash"

import { initializePayment, verifyPayment } from "../utils/payments.js";

class PaymentService {
    startPayment(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const form =  _.pick(data, ['amount', 'email', 'full_name'])
                form.metadata = {
                    full_name: form.full_name
                }
                form.amount *= 100

                initializePayment(form, (error, body) => {
                    if(error) {
                        reject(error.message)
                    }
                    const response = JSON.parse(body)

                    return resolve(response)
                })
            }catch(error) {
                error.source = 'Start payment Service'
                return reject(error)
            }
        })
    }

    
}