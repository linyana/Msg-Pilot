import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { GetUserLogsDto } from './dto/get-user-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user-log')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Get()
  findAll(@Query() getUserLogsDto: GetUserLogsDto, @Req() req: any) {
    return this.userLogService.findAll(getUserLogsDto, req);
  }
}
