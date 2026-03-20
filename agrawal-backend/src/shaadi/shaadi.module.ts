import { Module } from '@nestjs/common';
import { ShaadiService } from './shaadi.service';
import { ShaadiController } from './shaadi.controller';
import { shaadiProviders } from './shaadi.providers';

@Module({
  controllers: [ShaadiController],
  providers: [ShaadiService, ...shaadiProviders],
})
export class ShaadiModule {}
