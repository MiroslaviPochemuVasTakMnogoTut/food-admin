import { Test, TestingModule } from '@nestjs/testing';
import { WaiterGateway } from './waiter.gateway';

describe('WaiterGateway', () => {
  let gateway: WaiterGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaiterGateway],
    }).compile();

    gateway = module.get<WaiterGateway>(WaiterGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
