import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { SystemService } from './system.service';

describe('SystemService', () => {
  let service: SystemService;

  const exec = { exec: jest.fn()}
  const systemFactory = () => ({
    find: () => exec
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemService,
        {useFactory: systemFactory, provide: getModelToken('SystemModel')}
      ],
    }).compile();

    service = module.get<SystemService>(SystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get systems', async () => {
    const _id = new mongoose.Types.ObjectId().toHexString()
    systemFactory().find().exec.mockReturnValueOnce([{_id}])
    const res = await service.get()
    expect(res[0]._id).toBe(_id)
  });
});
