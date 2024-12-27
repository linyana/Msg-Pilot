import { CONNECTION_TYPE } from '@prisma/client';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Connection {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

class Account {
  @IsString()
  @IsOptional()
  cookie?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateConnectionDto {
  @IsEnum(CONNECTION_TYPE)
  type: CONNECTION_TYPE;

  @ValidateNested()
  @Type(() => Connection)
  connection: Connection;

  @ValidateNested()
  @Type(() => Account)
  account: Account;
}
