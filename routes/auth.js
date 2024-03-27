import express from "express"
const router = express.Router()

import authController from "../controller/authController.js"

// router.post("/register", authController.registerUser)
router.get("/", (req, res) => {
    res.send("tHIS IS auth endpoint")
})

export default router
