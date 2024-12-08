import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ required: true })
  business_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ required: true })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ required: true })
  password: string;
}
