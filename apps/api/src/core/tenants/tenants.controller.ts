import { Controller, Post, Body } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService, private authService: AuthService) {}
  @Post('sessions')
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login(email, password);
  }
}
