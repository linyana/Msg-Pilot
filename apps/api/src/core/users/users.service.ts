import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number) {
    return this.prisma.tenants.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, roundsOfHashing);
    }

    return this.prisma.tenants.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async findUserProfile(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async findConnector(id: number) {
    return await this.prisma.connections.findFirst({
      where: {
        id,
      },
    });
  }

  async getCurrentInfo(params: { connection_id: number; user_id: number }) {
    const { connection_id, user_id } = params;

    const connection = await this.prisma.connections.findUnique({
      where: {
        id: connection_id,
      },
      select: {
        name: true,
        type: true,
      },
    });

    const user = await this.prisma.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return {
      connection,
      user,
    };
  }
}
