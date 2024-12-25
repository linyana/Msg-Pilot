import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NoNeedConnectionGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isNoNeedConnection = this.reflector.get<boolean>('no_need_connection', context.getHandler());
    const isPublic = this.reflector.get<boolean>('is_public', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (isPublic || !token) {
      return true;
    }

    const decoded: any = this.jwtService.decode(token);
    if (!isNoNeedConnection && !decoded.connection_id) {
      return false;
    }

    return true;
  }
}
