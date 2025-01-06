import { DISTRIBUTION_RULE, TASK_TYPE } from '@prisma/client';
import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsArray()
  account_ids: number[];

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  expect_count: number;

  @IsEnum(TASK_TYPE)
  type: TASK_TYPE;

  @IsEnum(DISTRIBUTION_RULE)
  destribution_rule: DISTRIBUTION_RULE;

  @IsObject()
  @IsOptional()
  data: object;
}
