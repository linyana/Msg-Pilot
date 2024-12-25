import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectionService {
  findAll() {
    return `This action returns all connection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} connection`;
  }
}
