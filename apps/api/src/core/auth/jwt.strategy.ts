import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: { user_id: number; admin_user_id: number; connection_id: number }) {
    const user = await this.usersService.findUserProfile(Number(payload.user_id));

    if (!user) {
      throw new UnauthorizedException("Can't find user");
    }

    const connection = await this.usersService.findConnector(Number(payload.connection_id));

    if (!connection) {
      throw new UnauthorizedException("Can't find connection");
    }

    return {
      user,
      connection,
    };
  }
}
