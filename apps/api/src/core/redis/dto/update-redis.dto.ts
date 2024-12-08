import { PartialType } from '@nestjs/mapped-types';
import { CreateRedisDto } from './create-redis.dto';

export class UpdateRedisDto extends PartialType(CreateRedisDto) {}
