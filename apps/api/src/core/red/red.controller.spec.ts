import { Test, TestingModule } from '@nestjs/testing';
import { RedController } from './red.controller';
import { RedService } from './red.service';

describe('RedController', () => {
  let controller: RedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedController],
      providers: [RedService],
    }).compile();

    controller = module.get<RedController>(RedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
