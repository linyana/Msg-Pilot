import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { isPublic, NoNeedConnection, Req } from 'src/decorator';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService, private authService: AuthService) {}

  @Post('sessions')
  @isPublic()
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @NoNeedConnection()
  @Post('choose-connection')
  chooseConnection(@Req('tenant_id') tenant_id: number, @Req('user_id') user_id: number, @Body() body: { connection_id: number }) {
    const connection_id = body.connection_id;
    return this.authService.chooseConnection(tenant_id, user_id, Number(connection_id));
  }
}
