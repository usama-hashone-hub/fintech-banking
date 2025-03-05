import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from './receipt.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private receiptRepo: Repository<Receipt>,
  ) {}

  async generateReceipt(paymentId: string) {
    const receipt = this.receiptRepo.create({
      paymentId,
      details: { merchant: 'StoreX', items: ['Item1'] },
      status: 'PAID',
    });
    return this.receiptRepo.save(receipt);
  }

  async getLatestReceipt(userId: string) {
    return this.receiptRepo.findOne({
      where: { payment: { userId } },
      order: { createdAt: 'DESC' },
    });
  }
}