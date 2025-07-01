import { Request, Response, NextFunction } from 'express';
import BadRequest from '../error/error';
import PaymentService from '../service/payment.service';
import jwtToken from '../utils/jwtToken';
import generateAccountNumber from '../utils/account';

class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async createPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { vendorId, amount } = req.body;

      const user = jwtToken.verifiedToken(req);
      const account = generateAccountNumber();

      let userId: string;
      if (typeof user === 'object' && user !== null && 'id' in user) {
        userId = (user as any).id;
      } else {
        throw new BadRequest('User ID not found in token');
      }

      const savedPayment = await this.paymentService.createPayement({
        vendorId,
        generatedAccount: Number(account),
        amount,
        userId,
      });

      res.status(200).json({
        message: 'Successful',
        paymentDetails: {
          accountNumber: account,
          amount,
          id: savedPayment?.id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

 async getPayments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const payments = await this.paymentService.findPayment();

    const sanitized = (payments ?? []).map(payment => ({
      ...payment,
      amount: payment.amount.toString(),
      generatedAccount: payment.generatedAccount.toString(),
    }));

    res.status(200).json({ message: 'Successful', payments: sanitized });
  } catch (error) {
    next(error);
  }
}

async getPaymentByVendor(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const payments = await this.paymentService.findPayementByVendor(id);

    const sanitized = (payments ?? []).map(payment => ({
      ...payment,
      amount: payment.amount.toString(),
      generatedAccount: payment.generatedAccount.toString(),
    }));

    res.status(200).json({ message: 'Successful', payments: sanitized });
  } catch (error) {
    next(error);
  }
}


  async deletePayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.paymentService.deletePayment(id);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async approvePayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { generateAccountNumber, amount } = req.body;

      const payment = await this.paymentService.findPaymentByAccount(generateAccountNumber);
      if (!payment) throw new BadRequest('Invalid account');

      if (Number(amount) !== Number(payment.amount)) {
        throw new BadRequest('Invalid amount');
      }

      await this.paymentService.updatePaymentDetails(payment.id, { status: 'APPROVED' });

      res.status(200).json({ message: 'Payment approved successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default PaymentController;
