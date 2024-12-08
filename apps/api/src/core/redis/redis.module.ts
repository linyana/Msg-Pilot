import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import Redis from 'ioredis';

@Module({
  imports: [],
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory() {
        const client = new Redis(process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379, process.env.REDIS_HOST || 'localhost');
        return client;
      },
    },
  ],
  exports: [RedisService, 'REDIS_CLIENT'],
})
export class RedisModule {}
