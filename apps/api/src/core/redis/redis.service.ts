import { Inject, Injectable } from '@nestjs/common';
import { CreateRedisDto } from './dto/create-redis.dto';
import { Redis } from 'ioredis';
@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}
  async set(body: CreateRedisDto) {
    const { key, value, ttl } = body;
    try {
      return await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl || 86400);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  async get(key: string) {
    const res: any = await this.redisClient.get(key);
    return JSON.parse(res);
  }
  async del(key: string) {
    try {
      await this.redisClient.del(key);
      return 'success';
    } catch (error) {
      throw error;
    }
  }
}
