import { Test, TestingModule } from '@nestjs/testing';
import { XrayService } from './xray.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('XrayService', () => {
  let service: XrayService;
  let mockXrayModel: any;

  // A sample xray document for testing
  const mockXray = {
    _id: 'someId',
    deviceId: 'device1',
    time: 1234567890,
    dataVolume: 100,
    dataLength: 50,
  };

  beforeEach(async () => {
    // Create a basic mock for the Mongoose model
    mockXrayModel = jest.fn();
    mockXrayModel.create = jest.fn();
    mockXrayModel.find = jest.fn();
    mockXrayModel.findById = jest.fn();
    mockXrayModel.findByIdAndUpdate = jest.fn();
    mockXrayModel.findByIdAndDelete = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XrayService,
        {
          provide: getModelToken('Xray'),
          useValue: mockXrayModel,
        },
      ],
    }).compile();

    service = module.get<XrayService>(XrayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an xray', async () => {
      const createXrayDto = {
        deviceId: 'device1',
        time: 1234567890,
        dataVolume: 100,
        dataLength: 50,
      };

      // Create a mock for the "save" method that the created record will have.
      const saveMock = jest
        .fn()
        .mockResolvedValue({ _id: 'someId', ...createXrayDto });
      // When create() is called, return an object with a save method.
      mockXrayModel.create.mockResolvedValueOnce({
        ...createXrayDto,
        save: saveMock,
      });

      const result = await service.create(createXrayDto);
      expect(mockXrayModel.create).toHaveBeenCalledWith(createXrayDto);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual({ _id: 'someId', ...createXrayDto });
    });
  });

  describe('findAll', () => {
    it('should return xrays based on filters', async () => {
      const filters = {
        from: 1000,
        to: 5000,
        deviceId: 'device1',
        minDataVolume: 50,
        maxDataVolume: 150,
      };

      // Build the expected query object based on provided filters.
      const expectedQuery = {
        time: { $gte: filters.from, $lte: filters.to },
        deviceId: filters.deviceId,
        dataVolume: {
          $gte: filters.minDataVolume,
          $lte: filters.maxDataVolume,
        },
      };

      const execMock = jest.fn().mockResolvedValue([mockXray]);
      mockXrayModel.find.mockReturnValueOnce({ exec: execMock });

      const result = await service.findAll(filters);
      expect(mockXrayModel.find).toHaveBeenCalledWith(expectedQuery);
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual([mockXray]);
    });
  });

  describe('findOne', () => {
    it('should return an xray if found', async () => {
      const validId = new Types.ObjectId().toHexString();
      const execMock = jest.fn().mockResolvedValue(mockXray);
      mockXrayModel.findById.mockReturnValueOnce({ exec: execMock });

      const result = await service.findOne(validId);
      expect(mockXrayModel.findById).toHaveBeenCalledWith(validId);
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(mockXray);
    });

    it('should throw NotFoundException for an invalid id', async () => {
      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if xray is not found', async () => {
      const validId = new Types.ObjectId().toHexString();
      const execMock = jest.fn().mockResolvedValue(null);
      mockXrayModel.findById.mockReturnValueOnce({ exec: execMock });

      await expect(service.findOne(validId)).rejects.toThrow(NotFoundException);
      expect(mockXrayModel.findById).toHaveBeenCalledWith(validId);
      expect(execMock).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an xray', async () => {
      const validId = new Types.ObjectId().toHexString();
      const updateXrayDto = { dataVolume: 200 };
      const updatedXray = { ...mockXray, ...updateXrayDto };
      const execMock = jest.fn().mockResolvedValue(updatedXray);
      mockXrayModel.findByIdAndUpdate.mockReturnValueOnce({ exec: execMock });

      const result = await service.update(validId, updateXrayDto);
      expect(mockXrayModel.findByIdAndUpdate).toHaveBeenCalledWith(
        validId,
        updateXrayDto,
      );
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(updatedXray);
    });
  });

  describe('remove', () => {
    it('should remove an xray', async () => {
      const validId = new Types.ObjectId().toHexString();
      const execMock = jest.fn().mockResolvedValue(mockXray);
      mockXrayModel.findByIdAndDelete.mockReturnValueOnce({ exec: execMock });

      const result = await service.remove(validId);
      expect(mockXrayModel.findByIdAndDelete).toHaveBeenCalledWith(validId);
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(mockXray);
    });
  });
});
