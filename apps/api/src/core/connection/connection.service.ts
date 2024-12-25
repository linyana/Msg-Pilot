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
    const { name, type } = createConnectionDto;
    await this.prisma.connections.create({
      data: {
        name: name.trim(),
        type,
        tenant_id,
      },
    });
    return 'Successfully created connection';
  }
}
