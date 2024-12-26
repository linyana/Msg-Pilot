import { CONNECTION_TYPE } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateConnectionDto {
  @IsString()
  name: string;

  @IsEnum(CONNECTION_TYPE)
  type: CONNECTION_TYPE;
}
