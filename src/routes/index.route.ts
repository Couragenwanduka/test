import express from 'express';
import userRouter from './user.route';
import paymentRouter from './payment.route';

const router = express.Router();

router.use("/vendor", userRouter)
router.use("/payment", paymentRouter)

export default router;
