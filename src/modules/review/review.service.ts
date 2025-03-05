import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  async submitReview(userId: string, paymentId: string, rating: number, comment: string) {
    const review = this.reviewRepo.create({ userId, paymentId, rating, comment });
    return this.reviewRepo.save(review);
  }
}