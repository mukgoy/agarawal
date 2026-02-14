import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto/google-login.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('google')
  async googleLogin(@Body() dto: GoogleLoginDto) {
    return this.authService.googleLogin(dto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatePhone')
  async updatePhone(@Req() req: Request, @Body() dto: UpdatePhoneDto) {
    console.log('Received updatePhone request with phone:', dto.phone);
    return this.authService.updatePhone(dto.phone, req['user'].userId);
  }
}
