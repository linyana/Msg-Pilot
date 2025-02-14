import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Injectable()
export class ConnectionService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenant_id: number) {
    const connections = await this.prisma.connections.findMany({
      where: {
        tenant_id,
      },
      select: {
        id: true,
        type: true,
        name: true,
      },
    });
    return connections;
  }

  async createConnection(tenant_id: number, createConnectionDto: CreateConnectionDto) {
    const { account, connection, type } = createConnectionDto;

    const newConnection = await this.prisma.connections.create({
      data: {
        name: connection.name.trim() || '',
        description: connection.description,
        type,
        tenant_id,
      },
    });

    if (account.cookie || account.description || account.name) {
      await this.prisma.accounts.create({
        data: {
          name: account.name?.trim(),
          description: account.description,
          cookie: account.cookie,
          tenant_id,
          connection_id: Number(newConnection.id),
        },
      });
    }

    return 'Successfully created connection';
  }
}
