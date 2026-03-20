// src/user/dto/address.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileContactDto {

  @ApiProperty({ description: 'The phone number with comma(,) separated', example: '9876543210, 9876543210' })
  phone = '';

  @ApiProperty({ description: 'The email address', example: 'example@example.com' })
  email = '';

  @ApiProperty({ description: 'The address', example: '123 Main St, City, Country' })
  address = '';

}