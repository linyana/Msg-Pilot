import { Module } from '@nestjs/common';
import { RedService } from './red.service';
import { RedController } from './red.controller';

@Module({
  controllers: [RedController],
  providers: [RedService]
})
export class RedModule {}
