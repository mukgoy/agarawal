import { PartialType } from '@nestjs/swagger';
import { CreateShaadiProfileDto } from './create-shaadi-profile.dto';


export class UpdateShaadiProfileDto extends PartialType(CreateShaadiProfileDto) {}
