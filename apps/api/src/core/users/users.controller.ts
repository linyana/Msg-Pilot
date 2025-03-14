import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { NoNeedConnection, Req } from 'src/decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  findUserProfile(@Req() req: any) {
    return this.usersService.findUserProfile(req.user.id);
  }

  @Get('info')
  @NoNeedConnection()
  getCurrentInfo(@Req('connection_id') connection_id: number, @Req('user_id') user_id: number) {
    return this.usersService.getCurrentInfo({
      connection_id,
      user_id,
    });
  }
}
