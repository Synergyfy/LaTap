import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private businessesRepository: Repository<Business>,
  ) {}

  async create(businessData: Partial<Business>): Promise<Business> {
    const business = this.businessesRepository.create(businessData);
    return this.businessesRepository.save(business);
  }

  async findByOwner(ownerId: string): Promise<Business[]> {
    return this.businessesRepository.find({ where: { ownerId } });
  }

  async findById(id: string): Promise<Business> {
    const business = await this.businessesRepository.findOneBy({ id });
    if (!business) {
      throw new NotFoundException('Business not found');
    }
    return business;
  }

  async update(
    id: string,
    updateBusinessDto: UpdateBusinessDto,
  ): Promise<Business> {
    const business = await this.findById(id);
    Object.assign(business, updateBusinessDto);
    return this.businessesRepository.save(business);
  }
}
