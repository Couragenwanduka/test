import { Router } from 'express';
import { validator } from "../middleware/validator";
import PaymentController from '../controller/payment.controller';
import { authenticate } from '../middleware/auth.middleware';
import { createPaymentSchema, approvePaymentSchema } from '../schema/payment.schema';

const paymentRouter = Router();
const controller = new PaymentController();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePayment'
 *     responses:
 *       200:
 *         description: Payment created successfully
 *       400:
 *         description: Bad request
 */
paymentRouter.post('/payment', [validator(createPaymentSchema)], authenticate, controller.createPayment.bind(controller));

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 */
paymentRouter.get('/payment', authenticate, controller.getPayments.bind(controller));

/**
 * @swagger
 * /payment/vendor/{id}:
 *   get:
 *     summary: Get payments by vendor ID
 *     tags: [Payments]
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
 *         description: Payments for the specified vendor
 *       404:
 *         description: Vendor not found
 */
paymentRouter.get('/payment/vendor/:id', authenticate, controller.getPaymentByVendor.bind(controller));

/**
 * @swagger
 * /payment/approve:
 *   patch:
 *     summary: Approve a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApprovePayment'
 *     responses:
 *       200:
 *         description: Payment approved successfully
 *       400:
 *         description: Invalid payment or amount
 */
paymentRouter.patch('/payment/approve', [validator(approvePaymentSchema)], authenticate, controller.approvePayment.bind(controller));

/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
paymentRouter.delete('/payment/:id', authenticate, controller.deletePayment.bind(controller));

export default paymentRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePayment:
 *       type: object
 *       required:
 *         - vendorId
 *         - amount
 *       properties:
 *         vendorId:
 *           type: string
 *         amount:
 *           type: number
 *           example: 5000

 *     ApprovePayment:
 *       type: object
 *       required:
 *         - generateAccountNumber
 *         - amount
 *       properties:
 *         generateAccountNumber:
 *           type: string
 *         amount:
 *           type: number
 *           example: 5000
 */
