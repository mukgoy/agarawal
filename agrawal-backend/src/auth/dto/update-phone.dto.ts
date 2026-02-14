import { ApiProperty } from "@nestjs/swagger";

  export class UpdatePhoneDto {

    @ApiProperty({ description: 'The phone number', example: '9876543210' })
    phone = '';
    
  }