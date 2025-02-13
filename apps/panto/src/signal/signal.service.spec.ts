/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { SignalService } from './signal.service';
import { getModelToken } from '@nestjs/mongoose';

describe('SignalService', () => {
  let service: SignalService;
  let mockSignalModel: any;

  beforeEach(async () => {
    // Create a simple mock function for the model constructor.
    mockSignalModel = jest.fn();

    // Attach static methods used by the service (if needed in future tests).
    mockSignalModel.insertMany = jest.fn();
    mockSignalModel.find = jest.fn();
    mockSignalModel.findById = jest.fn();
    mockSignalModel.findByIdAndUpdate = jest.fn();
    mockSignalModel.findByIdAndDelete = jest.fn();
    mockSignalModel.deleteMany = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalService,
        {
          provide: getModelToken('Signal'),
          useValue: mockSignalModel,
        },
      ],
    }).compile();

    service = module.get<SignalService>(SignalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a signal', async () => {
    const createSignalDto = {
      x: 1,
      y: 2,
      time: 500,
      speed: 10,
      xrayId: 'x1',
    };

    // Create a mock for the "save" method which will be attached to the model instance.
    const saveMock = jest.fn().mockResolvedValue({
      _id: 'abc',
      ...createSignalDto,
    });

    // When a new instance is created (via "new this.signalModel(dto)"),
    // we return an object with a "save" method.
    mockSignalModel.mockImplementationOnce(() => ({
      ...createSignalDto,
      save: saveMock,
    }));

    const result = await service.create(createSignalDto);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual({ _id: 'abc', ...createSignalDto });
  });
});
