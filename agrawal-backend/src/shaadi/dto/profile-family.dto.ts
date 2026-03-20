// src/user/dto/address.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileFamilyDto {

  @ApiProperty({ description: "Father's Name", example: 'Late Purushottam Goyal'})
  fatherName = '';

  @ApiProperty({ description: "Father's Occupation", example: 'Retired'})
  fatherOccupation = '';

  @ApiProperty({ description: "Mother's Name", example: 'Padma Goyal'})
  motherName = '';

  @ApiProperty({ description: "Mother's Occupation", example: 'Housewife'})
  motherOccupation = '';

  @ApiProperty({ description: 'Number of Brothers', example: '2'})
  brothersCount = '';

  @ApiProperty({ description: 'Number of Sisters', example: '1'})
  sistersCount = '';
}
