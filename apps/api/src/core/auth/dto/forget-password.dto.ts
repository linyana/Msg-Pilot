import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  captcha_value: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  captcha_key: string;
}

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  captcha_value: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  captcha_key: string;
}
