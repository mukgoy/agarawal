import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShaadiModule } from './shaadi/shaadi.module';

@Module({
  imports: [UsersModule, AuthModule, ShaadiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
