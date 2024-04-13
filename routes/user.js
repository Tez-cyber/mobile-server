import express from "express";
import userController from "../controller/userController.js" 

const router = express.Router()

/**
 * @swagger
 * /api/{id}:
 *  put:
 *   summary: Update user info
 *   description: Allows new user to register info
 *   parameters: 
 *      - in: path
 *        name: id
 *        type: integer
 *        required: true
 *        description: User ID
 *   tags:
 *    - User Info
 *   responses:
 *      '200':
 *          description: Information updated successfully
 *      '400':
 *          description: Error updating user 
 */
router.put("/:id", userController.updateUser)
/**
 * @swagger
 * /api/{id}:
 *  delete:
 *   summary: Delete user account
 *   description: Allows user to delete account
 *   parameters: 
 *      - in: path
 *        name: id
 *        type: integer
 *        required: true
 *        description: User ID
 *   tags:
 *    - User Info
 *   responses:
 *      '200':
 *          description: User deleted successfully
 *      '400':
 *          description: Error deleting user 
 */  
router.delete("/:id", userController.deleteUser)  

export default router