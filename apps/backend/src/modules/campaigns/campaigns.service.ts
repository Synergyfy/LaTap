import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CampaignTemplate } from './entities/campaign-template.entity';
import { CreateCampaignDto, CampaignStatus } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CreateCampaignTemplateDto } from './dto/campaign-template.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(CampaignTemplate)
    private templateRepository: Repository<CampaignTemplate>,
  ) {}

  async create(
    createCampaignDto: CreateCampaignDto,
    businessId?: string,
  ): Promise<Campaign> {
    const campaign = this.campaignRepository.create({
      ...createCampaignDto,
      businessId,
    });
    // Mock initial stats
    campaign.sent = 0;
    campaign.delivered = '0%';
    campaign.clicks = 0;

    return this.campaignRepository.save(campaign);
  }

  async findAll(
    businessId?: string,
    status?: CampaignStatus,
  ): Promise<Campaign[]> {
    const where: any = {};
    if (businessId) where.businessId = businessId;
    if (status) where.status = status;

    return this.campaignRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const campaign = await this.findOne(id);
    Object.assign(campaign, updateCampaignDto);
    return this.campaignRepository.save(campaign);
  }

  async remove(id: string): Promise<void> {
    const campaign = await this.findOne(id);
    await this.campaignRepository.softDelete(campaign.id);
  }

  async getStats(businessId?: string) {
    // In a real app, we would aggregate this from the DB or a separate analytics table.
    // For now, we mock the trends but calculate the totals from actual campaigns if possible,
    // or just return the mocked structure required by the frontend.

    const campaigns = await this.findAll(businessId);

    const totalSent = campaigns.reduce((acc, c) => acc + c.sent, 0);
    const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
    const activeCount = campaigns.filter(
      (c) => c.status === CampaignStatus.ACTIVE,
    ).length;

    return [
      {
        label: 'Total Sent',
        value: totalSent.toLocaleString(),
        icon: 'send',
        color: 'blue',
        trend: { value: '+15%', isUp: true },
      },
      {
        label: 'Avg. Delivery',
        value: '94%', // Mocked for now
        icon: 'visibility',
        color: 'green',
        trend: { value: '+2%', isUp: true },
      },
      {
        label: 'Total Clicks',
        value: totalClicks.toLocaleString(),
        icon: 'touch_app',
        color: 'purple',
        trend: { value: '+1.5%', isUp: true },
      },
      {
        label: 'Active Campaigns',
        value: activeCount.toString(),
        icon: 'campaign',
        color: 'yellow',
        trend: { value: '0', isUp: true },
      },
    ];
  }

  // Templates
  async createTemplate(
    dto: CreateCampaignTemplateDto,
    businessId?: string,
  ): Promise<CampaignTemplate> {
    const template = this.templateRepository.create({
      ...dto,
      businessId,
    });
    return this.templateRepository.save(template);
  }

  async getTemplates(businessId?: string): Promise<CampaignTemplate[]> {
    // Return both global (null businessId) and specific business templates
    return this.templateRepository.find({
      where: [
        { businessId: IsNull() }, // Global
        ...(businessId ? [{ businessId }] : []),
      ],
      order: { createdAt: 'ASC' },
    });
  }
}
