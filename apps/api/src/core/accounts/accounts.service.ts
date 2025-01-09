import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async getAllAccounts(connection_id: number) {
    return this.prisma.accounts.findMany({
      where: {
        connection_id,
      },
    });
  }

  async createAccount(body: CreateAccountDto, tenant_id: number, connection_id: number) {
    const { name, description, cookie } = body;
    return this.prisma.accounts.create({
      data: {
        name,
        cookie,
        description,
        tenant_id,
        connection_id,
      },
    });
  }

  async editAccount(id: string, body: CreateAccountDto, tenant_id: number) {
    const { name, description, cookie } = body;

    const existTikAccount = await this.prisma.accounts.findUnique({
      where: {
        id: Number(id),
        tenant_id,
      },
    });

    if (!existTikAccount) {
      throw new BadRequestException('该账号不存在，请重试');
    }

    return this.prisma.accounts.update({
      where: {
        id: Number(existTikAccount.id),
      },
      data: {
        name,
        cookie,
        description,
        is_expired: false,
      },
    });
  }

  async deleteAccount(id: string, tenant_id: number) {
    const existAccount = await this.prisma.accounts.findUnique({
      where: {
        id: Number(id),
        tenant_id,
      },
    });

    if (!existAccount) {
      throw new BadRequestException('该账号不存在，请重试');
    }

    await this.prisma.accounts.delete({
      where: {
        id: Number(id),
      },
    });

    return 'Successfully deleted';
  }
}
