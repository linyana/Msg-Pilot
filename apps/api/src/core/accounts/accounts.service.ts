import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async getAllAccounts(connection_id: number) {
    const accounts = await this.prisma.accounts.findMany({
      where: {
        connection_id,
      },
    });

    return accounts;
  }
}
