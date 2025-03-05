import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Test User', description: 'The name of the user' })
  @IsString()
  name: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-string', description: 'The unique ID of the user' })
  id: string;

  @ApiProperty({ example: 'test@example.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: 'Test User', description: 'The name of the user' })
  name: string;
}