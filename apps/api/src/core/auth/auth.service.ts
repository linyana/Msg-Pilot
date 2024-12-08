import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from '../users/entities/auth.entity';
import * as bcrypt from 'bcryptjs';
import { ShopAuthEntity } from '../users/entities/shopAuth.entity';

@Injectable()
export class AuthService {
  private roundsOfHashing = 10;
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findFirst({ where: { email: email.toLowerCase() } });

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

    const access = this.jwtService.sign({ userId: user.id }, { secret: process.env.JWT_SECRET_KEY, expiresIn: '8h' });

    // const refresh = this.jwtService.sign({ userId: user.id }, { secret: process.env.JWT_REFRESH_SECRET_KEY, expiresIn: '1d' });
    const loginUser = { access, ...user };

    return new AuthEntity(loginUser);
  }

  async shopSession(userId: any, shop_id: any) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    const shop_access = this.jwtService.sign({ userId: userId, shop_id: shop_id }, { secret: process.env.JWT_SECRET_KEY });

    const shopUser = {
      shop_access,
      shop_id,
      userId,
      ...user,
    };
    return new ShopAuthEntity(shopUser);
  }
}
