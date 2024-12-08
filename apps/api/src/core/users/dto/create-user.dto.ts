import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ required: true })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ required: true })
  last_name: string;
}
