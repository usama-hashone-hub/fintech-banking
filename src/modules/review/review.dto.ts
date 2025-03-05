import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'uuid-string', description: 'The payment ID' })
  @IsString()
  paymentId: string;

  @ApiProperty({ example: 5, description: 'Rating between 1 and 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Great service!', description: 'Review comment' })
  @IsString()
  comment: string;
}