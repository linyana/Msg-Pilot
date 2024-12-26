import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({ where: { email: email.toLowerCase() } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    if (!user.password) {
      throw new UnauthorizedException('Please reset your password or enter from onboarding.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const access = this.jwtService.sign({ user_id: user.id }, { secret: process.env.JWT_SECRET_KEY, expiresIn: '1d' });

    return {
      access,
    };
  }

  async chooseConnection(tenant_id: number, user_id: number, connection_id: number) {
    if (!tenant_id || !connection_id || isNaN(connection_id)) {
      throw new BadRequestException();
    }

    const connection = await this.prisma.connections.findFirst({
      where: {
        id: connection_id,
        tenant_id,
      },
      select: {
        type: true,
        name: true,
      },
    });

    if (!connection) {
      throw new BadRequestException("Can't find this connection");
    }

    const access = this.jwtService.sign({ user_id, connection_id }, { secret: process.env.JWT_SECRET_KEY, expiresIn: '1d' });
    return { access, connection };
  }
}
