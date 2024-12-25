import { IConnectionType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateConnectionDto {
  @IsString()
  name: string;

  @IsEnum(IConnectionType)
  type: IConnectionType;
}
