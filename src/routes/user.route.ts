import { validator } from "../middleware/validator";
import UserController from "../controller/user.controller";
import { userSchema } from "../schema/user.schema";
import { Router } from 'express';
import { authenticate } from "../middleware/auth.middleware";

const user = new UserController()
const userRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: Vendor management
 */

/**
 * @swagger
 * /vendors:
 *   post:
 *     summary: Create a new vendor
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Bad request
 */
userRouter.post("/vendors", [validator(userSchema)], user.createUser.bind(user))

/**
 * @swagger
 * /vendors:
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 */
userRouter.get("/vendors", authenticate, user.getAllVendors.bind(user))

/**
 * @swagger
 * /vendors/{id}:
 *   get:
 *     summary: Get vendor by ID
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vendor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Vendor not found
 */
userRouter.get("/vendors/:id", authenticate, user.getVendorById.bind(user))

/**
 * @swagger
 * /vendors/{id}:
 *   put:
 *     summary: Update vendor
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 *       404:
 *         description: Vendor not found
 */
userRouter.put("/vendors/:id", authenticate, user.updateVendor.bind(user))

/**
 * @swagger
 * /vendors/{id}:
 *   delete:
 *     summary: Delete vendor
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vendor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
 *       404:
 *         description: Vendor not found
 */
userRouter.delete("/vendors/:id", authenticate, user.deleteUser.bind(user))

export default userRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         address:
 *           type: string
 *         role:
 *           type: string
 *           enum: [USER, VENDOR]
 */
