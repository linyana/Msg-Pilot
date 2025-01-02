import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

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

  @IsObject()
  @IsOptional()
  data: object;
}
