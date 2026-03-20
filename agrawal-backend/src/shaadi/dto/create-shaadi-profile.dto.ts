import { ApiProperty } from "@nestjs/swagger";
import { ProfilePersonalDto } from "./profile-personal.dto";
import { ProfileFamilyDto } from "./profile-family.dto";
import { ProfileContactDto } from "./profile-contact.dto";

export class CreateShaadiProfileDto {

    _id?: string = '';

    // @ApiProperty({description: 'The owner of a candidate', example: 'Mukesh Goyal ID'})
    owner: string = '';

    @ApiProperty({ description: 'personal details of a candidate', type: ProfilePersonalDto })
    personal: ProfilePersonalDto;

    @ApiProperty({ description: 'familty details of a candidate', type: ProfileFamilyDto })
    family: ProfileFamilyDto;

    @ApiProperty({ description: 'contact details of a candidate', type: ProfileContactDto })
    contact: ProfileContactDto;

    @ApiProperty({ description: 'images of a candidate', example: ['https://example.com/image1.jpg'] })
    images: string[] = [];
}
