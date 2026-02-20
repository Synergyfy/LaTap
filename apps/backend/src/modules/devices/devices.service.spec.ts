import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Device, DeviceStatus } from './entities/device.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('DevicesService', () => {
  let service: DevicesService;
  let repository: any;

  const mockDevice = {
    id: 'device-1',
    name: 'Tag 1',
    code: 'LT-123',
    status: DeviceStatus.ACTIVE,
    businessId: 'biz-1',
    totalScans: 10,
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockDevice),
    save: jest.fn().mockResolvedValue(mockDevice),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        { provide: getRepositoryToken(Device), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
    repository = module.get(getRepositoryToken(Device));
  });

  it('should create a device', async () => {
    mockRepository.findOneBy.mockResolvedValue(null);
    const result = await service.create('biz-1', {
      name: 'Tag 1',
      code: 'LT-123',
    });
    expect(result).toEqual(mockDevice);
  });

  it('should throw ConflictException if code exists', async () => {
    mockRepository.findOneBy.mockResolvedValue(mockDevice);
    await expect(
      service.create('biz-1', { name: 'Tag 1', code: 'LT-123' }),
    ).rejects.toThrow(ConflictException);
  });

  it('should return stats', async () => {
    mockRepository.find.mockResolvedValue([
      { ...mockDevice, status: DeviceStatus.ACTIVE, totalScans: 10 },
      {
        ...mockDevice,
        id: 'device-2',
        status: DeviceStatus.INACTIVE,
        totalScans: 5,
      },
    ]);
    const stats = await service.getStats('biz-1');
    expect(stats.totalDevices).toBe(2);
    expect(stats.activeNow).toBe(1);
    expect(stats.totalScans).toBe(15);
    expect(stats.offline).toBe(1);
  });
});
