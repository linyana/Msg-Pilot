import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Req = createParamDecorator((data: string, ctx: ExecutionContext): number | undefined => {
  const req = ctx.switchToHttp().getRequest();

  switch (data) {
    case 'connection':
      return req.user.connection;
    case 'connection_id':
      return Number(req.user.connection.id);
    case 'user_id':
      return Number(req.user.user.id);
    case 'tenant_id':
      return Number(req.user.user.tenant_id);
    default:
      return req;
  }
});
