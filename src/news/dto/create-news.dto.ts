import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ description: 'The title of the news article' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The content of the news article' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: 'The URL to the thumbnail image' })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiPropertyOptional({ description: 'List of tags for the news article', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
