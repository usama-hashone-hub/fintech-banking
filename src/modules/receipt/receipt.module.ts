import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipt.entity';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  providers: [ReceiptService],
  controllers: [ReceiptController],
  exports: [ReceiptService],
})
export class ReceiptModule {}