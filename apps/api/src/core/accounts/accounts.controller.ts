import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Req } from 'src/decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAllAccounts(@Req('connection_id') connection_id: number) {
    return this.accountsService.getAllAccounts(connection_id);
  }
}
