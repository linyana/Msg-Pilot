import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        (data) =>
          data?.render || {
            status: 200,
            data: Array.isArray(data?.data) ? data?.data : data,
            meta: {
              message: 'success',
              ...(data?.data && data?.meta),
            },
          },
      ),
    );
  }
}
