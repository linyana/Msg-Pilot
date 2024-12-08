import { Controller, Get, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UpdateUserLogDto } from './dto/update-user-log.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLogDto: UpdateUserLogDto) {
    return this.userLogService.update(+id, updateUserLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLogService.remove(+id);
  }
}
