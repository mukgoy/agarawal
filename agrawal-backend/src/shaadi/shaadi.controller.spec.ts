import { Test, TestingModule } from '@nestjs/testing';
import { ShaadiController } from './shaadi.controller';
import { ShaadiService } from './shaadi.service';

describe('ShaadiController', () => {
  let controller: ShaadiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShaadiController],
      providers: [ShaadiService],
    }).compile();

    controller = module.get<ShaadiController>(ShaadiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
