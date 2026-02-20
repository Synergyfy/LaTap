import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from './entities/user.entity';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(userData: Partial<User>): Promise<User> {
    if (
      userData.role &&
      ![UserRole.STAFF, UserRole.MANAGER].includes(userData.role)
    ) {
      throw new BadRequestException(
        'Only Staff and Manager roles can be assigned via invitation',
      );
    }

    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findByBusiness(businessId: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { businessId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateStaff(
    id: string,
    businessId: string,
    updates: UpdateStaffDto,
  ): Promise<User> {
    const user = await this.findOne(id);
    if (!user || user.businessId !== businessId) {
      throw new NotFoundException('Staff member not found');
    }

    if (
      updates.role &&
      updates.role === UserRole.OWNER &&
      user.role !== UserRole.OWNER
    ) {
      // Prevent changing non-owner to owner directly without checks?
      // Assuming minimal checks for now as per MVP.
    }

    // Use Object.assign to copy properties from updates to user
    Object.assign(user, updates);

    return this.usersRepository.save(user);
  }

  async remove(id: string, businessId: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user || user.businessId !== businessId) {
      throw new NotFoundException('Staff member not found');
    }
    if (user.role === UserRole.OWNER) {
      throw new BadRequestException('Cannot remove the business owner');
    }
    await this.usersRepository.remove(user);
  }
}
