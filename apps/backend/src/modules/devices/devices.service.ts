import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device, DeviceStatus } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  async create(
    businessId: string,
    createDeviceDto: CreateDeviceDto,
  ): Promise<Device> {
    const existing = await this.devicesRepository.findOneBy({
      code: createDeviceDto.code,
    });
    if (existing) {
      throw new ConflictException('Device code already registered');
    }

    const device = this.devicesRepository.create({
      ...createDeviceDto,
      businessId,
    });
    return this.devicesRepository.save(device);
  }

  async findAllByBusiness(businessId: string): Promise<Device[]> {
    return this.devicesRepository.find({
      where: { businessId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, businessId: string): Promise<Device> {
    const device = await this.devicesRepository.findOneBy({ id, businessId });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async update(
    id: string,
    businessId: string,
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    const device = await this.findOne(id, businessId);
    Object.assign(device, updateDeviceDto);
    return this.devicesRepository.save(device);
  }

  async remove(id: string, businessId: string): Promise<void> {
    const device = await this.findOne(id, businessId);
    await this.devicesRepository.remove(device);
  }

  async getStats(businessId: string) {
    const devices = await this.findAllByBusiness(businessId);
    return {
      totalDevices: devices.length,
      activeNow: devices.filter((d) => d.status === DeviceStatus.ACTIVE).length,
      totalScans: devices.reduce((acc, d) => acc + d.totalScans, 0),
      offline: devices.filter((d) => d.status === DeviceStatus.INACTIVE).length,
    };
  }
}
