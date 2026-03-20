import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfilePersonalDto {
 
  @ApiProperty({ description: 'First Name', example: 'Mukesh' })
  fname = '';

  @ApiProperty({ description: 'Last Name', example: 'Goyal' })
  lname = '';

  @ApiProperty({ description: 'Date of Birth', example: '01/01/1990' })
  dob = '';

  @ApiProperty({ description: 'Time of Birth', example: '10:30 AM' })
  tob = '';

  @ApiProperty({ description: 'Place of Birth', example: 'Sawai Madhopur' })
  pob = '';

  @ApiProperty({ description: 'Current Living City', example: 'Sawai Madhopur' })
  city = '';

  @ApiProperty({ description: 'Manglik', example: 'Yes' })
  manglik = '';

  @ApiProperty({ description: 'Gotra', example: 'Goyal' })
  gotra = '';

  @ApiProperty({ description: 'Height', example: '5 ft 8 in' })
  height = '';

  @ApiProperty({ description: 'Weight', example: '60 kg' })
  weight = '';

  @ApiProperty({ description: 'Education', example: 'B.Tech' })
  education = '';

  @ApiProperty({ description: 'Job Title', example: 'Software Engineer' })
  jobTitle = '';

}