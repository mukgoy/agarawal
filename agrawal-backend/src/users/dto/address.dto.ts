// src/user/dto/address.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
 
  @ApiProperty({ description: 'The house number', example: '' })
  houseNo = '';

  @ApiProperty({ description: 'The street name', example: 'Mahaveer Nagar First' })
  street = '';

  @ApiProperty({ description: 'The vilaage name', example: 'Haroti' })
  village = '';

  @ApiProperty({ description: 'The tehsil name', example: 'Gangapur' })
  tehsil = '';

  @ApiProperty({ description: 'The district name', example: 'Sawai Madhopur' })
  district = '';

  @ApiProperty({ description: 'The state name', example: 'Rajasthan' })
  state = '';

  @ApiProperty({ description: 'The post office', example: '324005' })
  postOffice = '';
}

export class UserAddressDto {
  @ApiProperty({ description: 'The legacy address', type: AddressDto })
  legacy: AddressDto;

  @ApiProperty({ description: 'The current address', type: AddressDto })
  current: AddressDto;
}