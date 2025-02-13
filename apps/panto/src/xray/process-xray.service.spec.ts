/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProcessXrayService } from './process-xray.service';
import { XrayService } from './xray.service';
import { SignalService } from '../signal/signal.service';
import { MeasurementDto } from './dto/measurement.dto';

describe('ProcessXrayService', () => {
  let processXrayService: ProcessXrayService;
  let xrayService: XrayService;
  let signalService: SignalService;

  // Create simple Jest mocks for the dependent services.
  const mockXrayService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findOne: jest.fn(),
  };

  const mockSignalService = {
    createMany: jest.fn(),
    removeMany: jest.fn(),
    findByXrayId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessXrayService,
        { provide: XrayService, useValue: mockXrayService },
        { provide: SignalService, useValue: mockSignalService },
      ],
    }).compile();

    processXrayService = module.get<ProcessXrayService>(ProcessXrayService);
    xrayService = module.get<XrayService>(XrayService);
    signalService = module.get<SignalService>(SignalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('processSignal', () => {
    it('should process measurement and create signals', async () => {
      // Arrange: Prepare a measurement DTO with a device key.
      const measurementDto = {
        "device1": {
          "time": 1234567890,
          "data": [
            [100, [1, 2, 3]],
            [200, [4, 5, 6]],
          ],
        },
      } as  any;

      // Simulate xrayService.create() returning an xray record with an _id.
      const xrayRecord = { _id: 'xray123' };
      mockXrayService.create.mockResolvedValueOnce(xrayRecord);

      // Simulate signalService.createMany() returning a value.
      const createdSignals = [{ id: 'signal1' }, { id: 'signal2' }];
      mockSignalService.createMany.mockResolvedValueOnce(createdSignals);

      // Act: Call processSignal().
      const result = await processXrayService.processSignal(measurementDto);

      // Assert: Check that xrayService.create() was called with the correct DTO.
      expect(mockXrayService.create).toHaveBeenCalledWith({
        deviceId: 'device1',
        time: 1234567890,
        dataLength: 2,
        dataVolume: Buffer.byteLength(
          JSON.stringify(measurementDto.device1.data),
          'utf8',
        ),
      });

      // The method should refine the data before passing it to createMany().
      const expectedRefinedData = [
        { xrayId: 'xray123', time: 100, x: 1, y: 2, speed: 3 },
        { xrayId: 'xray123', time: 200, x: 4, y: 5, speed: 6 },
      ];
      expect(mockSignalService.createMany).toHaveBeenCalledWith(
        expectedRefinedData,
      );
      expect(result).toEqual(createdSignals);
    });
  });

  describe('createXray', () => {
    it('should create xray and signals', async () => {
      // Arrange: Prepare a DTO for createXray.
      const createXrayDto2 = {
        deviceId: 'device2',
        time: 987654321,
        data: [
          { time: 50, x: 7, y: 8, speed: 9 },
          { time: 60, x: 10, y: 11, speed: 12 },
        ],
      };

      const xrayRecord = { _id: 'xray456' };
      mockXrayService.create.mockResolvedValueOnce(xrayRecord);

      const createdSignals = [{ id: 's1' }, { id: 's2' }];
      mockSignalService.createMany.mockResolvedValueOnce(createdSignals);

      // Act
      const result = await processXrayService.createXray(createXrayDto2);

      // Assert
      expect(mockXrayService.create).toHaveBeenCalledWith({
        deviceId: 'device2',
        time: 987654321,
        dataLength: 2,
        dataVolume: Buffer.byteLength(
          JSON.stringify(createXrayDto2.data),
          'utf8',
        ),
      });

      const expectedRefinedData = [
        { xrayId: 'xray456', time: 50, x: 7, y: 8, speed: 9 },
        { xrayId: 'xray456', time: 60, x: 10, y: 11, speed: 12 },
      ];
      expect(mockSignalService.createMany).toHaveBeenCalledWith(
        expectedRefinedData,
      );
      expect(result).toEqual(createdSignals);
    });
  });

  describe('updateXray', () => {
    it('should update xray and signals when data is provided', async () => {
      // Arrange: Prepare update DTO with data.
      const updateXrayDto2 = {
        deviceId: 'device3',
        time: 111111111,
        data: [
          { time: 70, x: 13, y: 14, speed: 15 },
          { time: 80, x: 16, y: 17, speed: 18 },
        ],
      };

      // Simulate service calls.
      mockXrayService.update.mockResolvedValueOnce({});
      mockSignalService.removeMany.mockResolvedValueOnce({});
      mockSignalService.createMany.mockResolvedValueOnce('signals updated');

      // Act
      const result = await processXrayService.updateXray(
        'xray789',
        updateXrayDto2,
      );

      // Assert: Check xray update call.
      expect(mockXrayService.update).toHaveBeenCalledWith('xray789', {
        deviceId: 'device3',
        time: 111111111,
        dataLength: 2,
        dataVolume: Buffer.byteLength(
          JSON.stringify(updateXrayDto2.data),
          'utf8',
        ),
      });
      // Signals should be removed and then created.
      expect(mockSignalService.removeMany).toHaveBeenCalledWith('xray789');

      const expectedRefinedData = [
        { xrayId: 'xray789', time: 70, x: 13, y: 14, speed: 15 },
        { xrayId: 'xray789', time: 80, x: 16, y: 17, speed: 18 },
      ];
      expect(mockSignalService.createMany).toHaveBeenCalledWith(
        expectedRefinedData,
      );
      expect(result).toEqual({
        message: 'Xray and associated signals updated successfully',
      });
    });

    it('should update xray without signals if data is not provided', async () => {
      // Arrange: Prepare update DTO without a data field.
      const updateXrayDto2 = {
        deviceId: 'device3',
        time: 111111111,
      };

      mockXrayService.update.mockResolvedValueOnce({});

      // Act
      const result = await processXrayService.updateXray(
        'xray789',
        updateXrayDto2,
      );

      // Assert: In this case, no signals should be updated.
      expect(mockXrayService.update).toHaveBeenCalledWith('xray789', {
        deviceId: 'device3',
        time: 111111111,
        dataLength: undefined,
        dataVolume: undefined,
      });
      expect(mockSignalService.removeMany).not.toHaveBeenCalled();
      expect(mockSignalService.createMany).not.toHaveBeenCalled();
      expect(result).toEqual({
        message: 'Xray and associated signals updated successfully',
      });
    });
  });

  describe('removeXray', () => {
    it('should remove xray and its signals', async () => {
      // Arrange
      mockXrayService.remove.mockResolvedValueOnce({});
      mockSignalService.removeMany.mockResolvedValueOnce({});

      // Act
      const result = await processXrayService.removeXray('xray123');

      // Assert
      expect(mockXrayService.remove).toHaveBeenCalledWith('xray123');
      expect(mockSignalService.removeMany).toHaveBeenCalledWith('xray123');
      expect(result).toEqual({ message: 'successfully deleted' });
    });
  });

  describe('getXray', () => {
    it('should get xray and its signals', async () => {
      // Arrange
      const xrayRecord = {
        _id: 'xray999',
        deviceId: 'device4',
        time: 222222222,
        dataLength: 2,
        dataVolume: 123,
      };
      const signals = [{ id: 's1' }, { id: 's2' }];

      mockXrayService.findOne.mockResolvedValueOnce(xrayRecord);
      mockSignalService.findByXrayId.mockResolvedValueOnce(signals);

      // Act
      const result = await processXrayService.getXray('xray999');

      // Assert
      expect(mockXrayService.findOne).toHaveBeenCalledWith('xray999');
      expect(mockSignalService.findByXrayId).toHaveBeenCalledWith('xray999');
      expect(result).toEqual({ ...xrayRecord, data: signals });
    });
  });
});
