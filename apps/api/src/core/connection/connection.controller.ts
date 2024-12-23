import { Controller, Get, Param } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Get()
  findAll() {
    return this.connectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.connectionService.findOne(+id);
  }
}
