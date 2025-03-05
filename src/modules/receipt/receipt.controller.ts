import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Receipt } from './receipt.entity';

@ApiTags('receipt')
@Controller('receipt')
@UseGuards(JwtAuthGuard)
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get latest receipt' })
  @ApiResponse({ status: 200, description: 'Latest receipt', type: Receipt })
  async getLatestReceipt(@Req() req) {
    const userId = req.user.id;
    return this.receiptService.getLatestReceipt(userId);
  }
}