import { Module } from '@nestjs/common';
import { ShaadiService } from './shaadi.service';
import { ShaadiController } from './shaadi.controller';

@Module({
  controllers: [ShaadiController],
  providers: [ShaadiService],
})
export class ShaadiModule {}
