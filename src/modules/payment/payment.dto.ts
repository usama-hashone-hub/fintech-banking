import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class ScanPaymentDto {
  @ApiProperty({
    example: 'CARD',
    description: 'The payment method',
    enum: ['CARD', 'CRYPTO', 'WALLET', 'SN_TOKEN'],
  })
  @IsEnum(['CARD', 'CRYPTO', 'WALLET', 'SN_TOKEN'])
  paymentMethod: string;
}

export class ChargePaymentDto {
  @ApiProperty({ example: 'merchant123', description: 'The merchant QR code' })
  @IsString()
  qrCode: string;
}