import express from "express"
const router = express.Router()

import authController from "../controller/authController.js"

/**
 * @swagger
 * /register:
 *  post:
 *   summary: Register user
 *   description: Allows new user to register info
 *   tags:
 *      - Authentication
 *   responses:
 *      '200':
 *          description: User registered successfully
 *      '400':
 *          description: Error registering user 
 */
router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)



export default router
