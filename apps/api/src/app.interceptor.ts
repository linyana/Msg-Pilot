import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import JSONBig from 'json-bigint';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigintInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return JSONBig.parse(JSONBig.stringify(data));
      }),
    );
  }
}
