import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests = new Map<string, number>();

  use(req: Request, res: Response, next: NextFunction) {
    const ipAddress = req.ip || '';

    const requestCount = this.requests.get(ipAddress) || 0;

    const maxRequestsPerMinute = 100;
    const windowMinutes = 1;
    const windowMilliseconds = windowMinutes * 60 * 1000;

    if (requestCount > maxRequestsPerMinute) {
      throw new BadRequestException('Too many request!');
    }

    this.requests.set(ipAddress, requestCount + 1);

    setTimeout(() => {
      this.requests.delete(ipAddress);
    }, windowMilliseconds);

    next();
  }
}
