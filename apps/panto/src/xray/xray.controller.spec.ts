import { Test, TestingModule } from '@nestjs/testing';
import { XrayController } from './xray.controller';
import { XrayService } from './xray.service';
import { ProcessXrayService } from './process-xray.service';
import { MeasurementDto } from './dto/measurement.dto';
import { CreateXrayDto2 } from './dto/create-xray-2.dto';
import { GetXrayFilterDto } from './dto/get-xrays.filter.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';

describe('XrayController', () => {
  let controller: XrayController;
  let xrayService: XrayService;
  let processXrayService: ProcessXrayService;

  const mockXrayService = {
    findAll: jest.fn(),
  };

  const mockProcessXrayService = {
    processSignal: jest.fn(),
    createXray: jest.fn(),
    getXray: jest.fn(),
    updateXray: jest.fn(),
    removeXray: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XrayController],
      providers: [
        { provide: XrayService, useValue: mockXrayService },
        { provide: ProcessXrayService, useValue: mockProcessXrayService },
      ],
    }).compile();

    controller = module.get<XrayController>(XrayController);
    xrayService = module.get<XrayService>(XrayService);
    processXrayService = module.get<ProcessXrayService>(ProcessXrayService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleScan', () => {
    it('should call processSignal on processXrayService with measurementDto', async () => {
      // Arrange: Create a measurementDto object.
      const measurementDto: MeasurementDto = {
        device1: {
          time: 1234567890,
          data: [
            [100, [1, 2, 3]],
            [200, [4, 5, 6]],
          ],
        },
      } as unknown as MeasurementDto; // use type assertion to bypass type issues

      const expectedResult = 'scan-result';
      mockProcessXrayService.processSignal.mockResolvedValueOnce(
        expectedResult,
      );

      // Act
      const result = await controller.handleScan(measurementDto);

      // Assert
      expect(mockProcessXrayService.processSignal).toHaveBeenCalledWith(
        measurementDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should call createXray on processXrayService with createXrayDto2', async () => {
      // Arrange: Create a DTO for creating an xray.
      const createXrayDto2: CreateXrayDto2 = {
        deviceId: 'device2',
        time: 987654321,
        data: [
          { time: 50, x: 7, y: 8, speed: 9 },
          { time: 60, x: 10, y: 11, speed: 12 },
        ],
      };

      const expectedResult = 'create-result';
      mockProcessXrayService.createXray.mockResolvedValueOnce(expectedResult);

      // Act
      const result = await controller.create(createXrayDto2);

      // Assert
      expect(mockProcessXrayService.createXray).toHaveBeenCalledWith(
        createXrayDto2,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call findAll on xrayService with filters', async () => {
      // Arrange: Create a filters object.
      const filters: GetXrayFilterDto = {
        from: 1000,
        to: 5000,
        deviceId: 'device1',
        minDataVolume: 10,
        maxDataVolume: 100,
      };

      const expectedResult = 'findAll-result';
      mockXrayService.findAll.mockResolvedValueOnce(expectedResult);

      // Act
      const result = await controller.findAll(filters);

      // Assert
      expect(xrayService.findAll).toHaveBeenCalledWith(filters);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call getXray on processXrayService with id', async () => {
      // Arrange: Define an id.
      const id = 'xray123';
      const expectedResult = 'getXray-result';
      mockProcessXrayService.getXray.mockResolvedValueOnce(expectedResult);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(mockProcessXrayService.getXray).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call updateXray on processXrayService with id and updateXrayDto', async () => {
      // Arrange: Create an update DTO.
      const id = 'xray123';
      const updateXrayDto: UpdateXrayDto = {
        deviceId: 'device3',
        time: 111111111,
        data: [
          { time: 70, x: 13, y: 14, speed: 15 },
          { time: 80, x: 16, y: 17, speed: 18 },
        ],
      } as any; // use assertion if necessary
      const expectedResult = 'update-result';
      mockProcessXrayService.updateXray.mockResolvedValueOnce(expectedResult);

      // Act
      const result = await controller.update(id, updateXrayDto);

      // Assert
      expect(mockProcessXrayService.updateXray).toHaveBeenCalledWith(
        id,
        updateXrayDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should call removeXray on processXrayService with id', async () => {
      // Arrange
      const id = 'xray123';
      const expectedResult = 'remove-result';
      mockProcessXrayService.removeXray.mockResolvedValueOnce(expectedResult);

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(mockProcessXrayService.removeXray).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
