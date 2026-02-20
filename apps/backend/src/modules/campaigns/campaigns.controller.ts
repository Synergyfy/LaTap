import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto, CampaignStatus } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CreateCampaignTemplateDto } from './dto/campaign-template.dto';
import { Campaign } from './entities/campaign.entity';
import { CampaignTemplate } from './entities/campaign-template.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  private getBusinessId(req: any): string {
    return req.user?.businessId || '123e4567-e89b-12d3-a456-426614174000';
  }

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({
    status: 201,
    description: 'The campaign has been successfully created.',
    type: Campaign,
  })
  create(@Body() createCampaignDto: CreateCampaignDto, @Req() req: any) {
    return this.campaignsService.create(
      createCampaignDto,
      this.getBusinessId(req),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiQuery({ name: 'status', enum: CampaignStatus, required: false })
  @ApiResponse({
    status: 200,
    description: 'List of campaigns',
    type: [Campaign],
  })
  findAll(@Req() req: any, @Query('status') status?: CampaignStatus) {
    return this.campaignsService.findAll(this.getBusinessId(req), status);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get campaign dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard statistics cards' })
  getStats(@Req() req: any) {
    return this.campaignsService.getStats(this.getBusinessId(req));
  }

  @Get('scheduled')
  @ApiOperation({ summary: 'Get scheduled campaigns' })
  @ApiResponse({
    status: 200,
    description: 'List of scheduled campaigns',
    type: [Campaign],
  })
  getScheduled(@Req() req: any) {
    return this.campaignsService.findAll(
      this.getBusinessId(req),
      CampaignStatus.SCHEDULED,
    );
  }

  @Get('templates')
  @ApiOperation({ summary: 'Get campaign templates' })
  @ApiResponse({
    status: 200,
    description: 'List of campaign templates',
    type: [CampaignTemplate],
  })
  getTemplates(@Req() req: any) {
    return this.campaignsService.getTemplates(this.getBusinessId(req));
  }

  @Post('templates')
  @ApiOperation({ summary: 'Create a campaign template' })
  @ApiResponse({
    status: 201,
    description: 'The template has been created.',
    type: CampaignTemplate,
  })
  createTemplate(
    @Body() createTemplateDto: CreateCampaignTemplateDto,
    @Req() req: any,
  ) {
    return this.campaignsService.createTemplate(
      createTemplateDto,
      this.getBusinessId(req),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a campaign by ID' })
  @ApiResponse({
    status: 200,
    description: 'The campaign details',
    type: Campaign,
  })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign' })
  @ApiResponse({
    status: 200,
    description: 'The updated campaign',
    type: Campaign,
  })
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign' })
  @ApiResponse({ status: 200, description: 'Campaign successfully deleted' })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
