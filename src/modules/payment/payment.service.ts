import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { NotificationService } from '../notification/notification.service';
import { ReceiptService } from '../receipt/receipt.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    private notificationService: NotificationService,
    private receiptService: ReceiptService,
  ) {}

  async getCheckoutDetails(userId: string) {
    return {
      paymentOptions: ['CARD', 'CRYPTO', 'WALLET', 'SN_TOKEN'],
      scanToPayEnabled: true,
      userId,
    };
  }

  async initiateScan(userId: string, paymentMethod: string) {
    const validMethods = ['CARD', 'CRYPTO', 'WALLET', 'SN_TOKEN'];
    if (!validMethods.includes(paymentMethod)) {
      throw new BadRequestException('Invalid payment method');
    }
    return { userId, paymentMethod, scanInitiated: true };
  }

  async processPayment(userId: string, qrCode: string) {
    const payment = this.paymentRepo.create({
      userId,
      amount: 100.00, // Mock amount
      currency: 'GBP',
      method: 'CARD', // Mock method
      merchantQrCode: qrCode,
      status: 'COMPLETED',
    });
    await this.paymentRepo.save(payment);
    await this.notificationService.createNotification(userId, 'Payment successful', 'PAYMENT_SUCCESS');
    await this.receiptService.generateReceipt(payment.id);
    return { paymentId: payment.id, status: 'COMPLETED' };
  }
}