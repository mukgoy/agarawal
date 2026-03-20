import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ShaadiService } from './shaadi.service';
import { CreateShaadiProfileDto } from './dto/create-shaadi-profile.dto';
import { UpdateShaadiProfileDto } from './dto/update-shaadi-profile.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shaadi')
export class ShaadiController {
  constructor(private readonly shaadiService: ShaadiService) {}

  @Post('profile')
  create(@Req() req: Request, @Body() createProfileDto: CreateShaadiProfileDto) {
    return this.shaadiService.create(createProfileDto, req['user'].userId);
  }

  @Get('profiles')
  findAll(@Req() req: Request, @Query() query: any) {
    const userId = query.all ? "" : req['user'].userId;
    return this.shaadiService.findAll(userId);
  }

  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    return this.shaadiService.findOne(id);
  }

  @Patch('profile')
  update(@Body() updateShaadiDto: UpdateShaadiProfileDto) {
    return this.shaadiService.update(updateShaadiDto);
  }

  @Delete('profile/:id')
  remove(@Param('id') id: string) {
    return this.shaadiService.remove(id);
  }
}
