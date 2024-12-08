import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CreateRedisDto } from './dto/create-redis.dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
  @Post('set')
  async setCache(@Body() body: CreateRedisDto) {
    return await this.redisService.set(body);
  }

  @Get('get/:key')
  async getCache(@Param('key') key: string) {
    const value = await this.redisService.get(key);
    return { key, value };
  }

  @Get('del/:key')
  async deleteCache(@Param('key') key: string) {
    return await this.redisService.del(key);
  }
}
