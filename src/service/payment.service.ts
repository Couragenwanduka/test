import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

import type { ForPayment } from '../generated/prisma';

interface PaymentType {
  vendorId: string;
  amount: number;
  generatedAccount: number;
  userId: string;
  status?: ForPayment;
}

class PaymentService {
  constructor() {}

  async createPayement(payment: PaymentType) {
    try {
      const paymentSlip = await prisma.payment.create({ data: payment });
      return paymentSlip;
    } catch (error) {
      console.error("An error occurred while trying to create payment", error);
    }
  }

  async findPaymentByAccount(account: string) {
    try {
      const payment = await prisma.payment.findFirst({
        where: { generatedAccount: parseInt(account) },
      });
      return payment;
    } catch (error) {
      console.error("An error occurred while finding payment", error);
    }
  }

  async findPayementByVendor(vendor: string) {
    try {
      const payment = await prisma.payment.findMany({
        where: { vendorId: vendor },
      });
      return payment;
    } catch (error) {
      console.log("An error occurred while finding payment by Vendor");
    }
  }

  async findPayment() {
    try {
      const payment = await prisma.payment.findMany();
      return payment;
    } catch (error) {
      console.error("An error occurred while trying to find payment");
    }
  }

  async updatePaymentDetails(id: string, update: Partial<PaymentType>) {
    try {
      const updated = await prisma.payment.update({
        where: { id },
        data: update,
      });
      return updated;
    } catch (error) {
      console.error("An error occurred while updating payment", error);
    }
  }

  async deletePayment(id: string) {
    try {
      const deleted = await prisma.payment.delete({
        where: { id },
      });
      return deleted;
    } catch (error) {
      console.error("An error occurred while deleting payment", error);
    }
  }
}

export default PaymentService;
