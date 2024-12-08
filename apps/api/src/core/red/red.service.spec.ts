import { Test, TestingModule } from '@nestjs/testing';
import { RedService } from './red.service';

describe('RedService', () => {
  let service: RedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedService],
    }).compile();

    service = module.get<RedService>(RedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
