import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/notification.entity';
import { Receipt } from '../receipt/receipt.entity';
import { ReceiptService } from '../receipt/receipt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Notification, Receipt])],
  providers: [PaymentService, NotificationService, ReceiptService],
  controllers: [PaymentController],
})
export class PaymentModule {}