import { Controller } from '@nestjs/common';
import { RedService } from './red.service';

@Controller('red')
export class RedController {
  constructor(private readonly redService: RedService) {}
}
