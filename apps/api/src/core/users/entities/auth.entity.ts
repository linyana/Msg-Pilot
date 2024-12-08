import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  constructor(loginUser: any) {
    Object.assign(this, loginUser);
  }
  @ApiProperty()
  access: string;
  @ApiProperty()
  refresh: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  ssoTicket: string;
}
