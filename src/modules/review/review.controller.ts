import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateReviewDto } from './review.dto';
import { Review } from './review.entity';

@ApiTags('review')
@Controller('review')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a review' })
  @ApiResponse({ status: 201, description: 'Review submitted', type: Review })
  async submitReview(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    const userId = req.user.id;
    return this.reviewService.submitReview(
      userId,
      createReviewDto.paymentId,
      createReviewDto.rating,
      createReviewDto.comment,
    );
  }
}