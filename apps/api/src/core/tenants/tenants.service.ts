import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TenantsService {
  private roundsOfHashing = 10;
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }
}
