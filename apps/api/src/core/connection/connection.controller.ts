import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { NoNeedConnection, Req } from 'src/decorator';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('connections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Get()
  @NoNeedConnection()
  findAll(@Req('tenant_id') tenant_id: number) {
    return this.connectionService.findAll(tenant_id);
  }

  @Post()
  @NoNeedConnection()
  createConnection(@Req('tenant_id') tenant_id: number, @Body() createConnectionDto: CreateConnectionDto) {
    return this.connectionService.createConnection(tenant_id, createConnectionDto);
  }
}
