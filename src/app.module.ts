import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReceiptModule } from './modules/receipt/receipt.module';
import { ReviewModule } from './modules/review/review.module'; 
import { UserModule } from './modules/user/user.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    NotificationModule,
    PaymentModule,
    ReceiptModule,
    ReviewModule,
    UserModule,
  ],
})
export class AppModule {}