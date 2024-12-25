import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Req } from 'src/decorator';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService, private authService: AuthService) {}
  @Post('sessions')
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('choose-connection')
  chooseConnection(@Req('tenant_id') tenant_id: number, @Req('user_id') user_id: number, @Body() body: { connecion_id: number }) {
    const connection_id = body.connecion_id;
    return this.authService.chooseConnection(tenant_id, user_id, connection_id);
  }
}
