import { Module } from '@nestjs/common';
import { MailService } from '../mails/mails.service';
import { MailController } from './mails.controller';

@Module({
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
