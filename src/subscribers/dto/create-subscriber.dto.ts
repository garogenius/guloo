import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @ApiProperty({ example: 'user@example.com', description: 'The email address of the subscriber' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
