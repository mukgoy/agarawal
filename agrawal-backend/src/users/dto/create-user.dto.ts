import { ApiProperty } from "@nestjs/swagger";
import { AddressDto, UserAddressDto } from "./address.dto";

export class CreateUserDto {

    _id?: string = '';

    @ApiProperty({
        description: 'The name of a candidate',
        example: 'Mukesh Goyal',
    })
    name: string = '';

    @ApiProperty({
        description: 'The 10 digit phone number of a candidate',
        example: '9783719326',
    })
    phone: string = '';

    @ApiProperty({
        description: 'The 10 digit phone number of a candidate',
        type: UserAddressDto,
    })
    address = {
        legacy: AddressDto,
        current: AddressDto
    }
}
