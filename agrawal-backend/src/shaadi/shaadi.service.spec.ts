import { Test, TestingModule } from '@nestjs/testing';
import { ShaadiService } from './shaadi.service';

describe('ShaadiService', () => {
  let service: ShaadiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShaadiService],
    }).compile();

    service = module.get<ShaadiService>(ShaadiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
