import { ApiProperty } from "@nestjs/swagger";

export class GoogleLoginDto {
    @ApiProperty({ description: 'The token privided by google login', example: 'Mahaveer Nagar First' })
    token: string;
}
