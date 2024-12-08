import { Module } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UserLogController } from './user-log.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserLogController],
  providers: [UserLogService],
})
export class UserLogModule {}
