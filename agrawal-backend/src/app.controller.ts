import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health-check')
  async getHealthCheck() {
    // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate some async operation
    return {status: 'ok', message: 'Health check successful'};
  }
}
