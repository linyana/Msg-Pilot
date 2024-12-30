import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Req } from 'src/decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAllAccounts(@Req('connection_id') connection_id: number) {
    return this.accountsService.getAllAccounts(connection_id);
  }

  @Post()
  createTikTookSession(@Body() body: CreateAccountDto, @Req('tenant_id') tenant_id: number, @Req('connection_id') connection_id: number) {
    return this.accountsService.createAccount(body, tenant_id, connection_id);
  }

  @Patch(':id')
  editAccount(@Param() { id }: { id: string }, @Body() body: CreateAccountDto, @Req('tenant_id') tenant_id: number) {
    return this.accountsService.editAccount(id, body, tenant_id);
  }

  @Delete(':id')
  deleteTikTookSession(@Param() { id }: { id: string }, @Req('tenant_id') tenant_id: number) {
    return this.accountsService.deleteAccount(id, tenant_id);
  }
}
