import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateTestimonialDto {
  @ApiPropertyOptional({ description: 'Profile image URL of the user' })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty({ description: 'Name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Review content' })
  @IsNotEmpty()
  @IsString()
  review: string;

  @ApiProperty({ description: 'Rating given by the user (1-5)' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
