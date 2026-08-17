import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller(':tenant/news')
export class PublicNewsController {
  constructor(private readonly newsService: NewsService) {}

  private validateTenant(tenant: string): 'nattypay' | 'valarpay' {
    if (tenant !== 'nattypay' && tenant !== 'valarpay') {
      throw new BadRequestException('Invalid tenant');
    }
    return tenant;
  }

  @Get()
  findAll(@Param('tenant') tenant: string) {
    const validTenant = this.validateTenant(tenant);
    return this.newsService.findAll(validTenant);
  }

  @Get(':id')
  findOne(@Param('tenant') tenant: string, @Param('id') id: string) {
    const validTenant = this.validateTenant(tenant);
    return this.newsService.findOne(validTenant, id);
  }
}
