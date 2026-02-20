import {
  Controller,
  Get,
  Patch,
  Body,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { UpdateBusinessDto } from './dto/update-business.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('businesses')
@ApiBearerAuth()
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Get('my-business')
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF)
  @ApiOperation({ summary: 'Get details of the business for current user' })
  async getMyBusiness(@Request() req) {
    return this.businessesService.findById(req.user.businessId);
  }

  @Patch(':id')
  @Roles(UserRole.OWNER)
  @ApiOperation({
    summary: 'Update business settings (Welcome messages, Rewards, etc.)',
  })
  @ApiResponse({ status: 200, description: 'Business updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessesService.update(id, updateBusinessDto);
  }
}
