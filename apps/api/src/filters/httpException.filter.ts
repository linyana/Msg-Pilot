import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.response.statusCode;
    const message = exception.response.message;

    Logger.log(`${request.url} - ${message}`, 'error request!');

    response.status(status).json({
      status,
      data: null,
      meta: {
        message,
      },
    });
  }
}
