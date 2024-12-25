import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Req = createParamDecorator((data: string, ctx: ExecutionContext): number | undefined => {
  const req = ctx.switchToHttp().getRequest();
  let response = req;

  switch (data) {
    case 'connection':
      response = req.connection;
    case 'connection_id':
      response = Number(req.connection.id);
    case 'user_id':
      response = Number(req.user.id);
    case 'tenant_id':
      response = Number(req.user.tenant_id);
    default:
      response = req;
  }

  return response;
});
