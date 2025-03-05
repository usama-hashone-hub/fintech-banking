import { Controller, Get, Post, Body, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ScanPaymentDto, ChargePaymentDto } from './payment.dto';

@ApiTags('payment')
@Controller()
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('checkout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get checkout details' })
  @ApiResponse({ status: 200, description: 'Checkout details with payment options' })
  async getCheckoutDetails(@Req() req) {
    const userId = req.user.id;
    return this.paymentService.getCheckoutDetails(userId);
  }

  @Post('checkout/scan')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate scan to pay' })
  @ApiResponse({ status: 201, description: 'Scan initiated' })
  @ApiResponse({ status: 400, description: 'Invalid payment method' })
  async initiateScan(@Body() scanPaymentDto: ScanPaymentDto, @Req() req) {
    const userId = req.user.id;
    return this.paymentService.initiateScan(userId, scanPaymentDto.paymentMethod);
  }

  @Post('payment/charge')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Charge payment using QR code' })
  @ApiResponse({ status: 201, description: 'Payment charged successfully' })
  async chargePayment(@Body() chargePaymentDto: ChargePaymentDto, @Req() req) {
    const userId = req.user.id;
    return this.paymentService.processPayment(userId, chargePaymentDto.qrCode);
  }
}