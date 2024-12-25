import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';

@Module({
  controllers: [ConnectionController],
  providers: [ConnectionService],
})
export class ConnectionModule {}
