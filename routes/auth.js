import express from "express"
const router = express.Router()

import authController from "../controller/authController.js"

/**
 * @swagger
 * /api/auth/register:
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
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *   summary: User Login
 *   description: Allows users to login into respective accounts
 *   tags:
 *      - Authentication
 *   responses:
 *      '200':
 *          description: User logged in successfully
 *      '400':
 *          description: Error logging in user 
 */
router.post("/login", authController.loginUser)



export default router
