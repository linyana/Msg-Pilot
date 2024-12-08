import { ApiProperty } from '@nestjs/swagger';

export class ShopAuthEntity {
  constructor(loginUser: any) {
    Object.assign(this, loginUser);
  }
  @ApiProperty()
  access: string;
  @ApiProperty()
  refresh: string;
  @ApiProperty()
  tenant_id: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  shop_id: string;
}
