import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FaqsService } from './faqs.service';

@ApiTags('Public FAQs')
@Controller(':tenant/faqs')
export class PublicFaqsController {
  constructor(private readonly faqsService: FaqsService) { }

  private validateTenant(tenant: string): 'nattypay' | 'valarpay' {
    if (tenant !== 'nattypay' && tenant !== 'valarpay') {
      throw new BadRequestException('Invalid tenant');
    }
    return tenant;
  }

  @Get()
  findAll(@Param('tenant') tenant: string) {
    const validTenant = this.validateTenant(tenant);
    return this.faqsService.findAll(validTenant);
  }

  @Get(':id')
  findOne(@Param('tenant') tenant: string, @Param('id') id: string) {
    const validTenant = this.validateTenant(tenant);
    return this.faqsService.findOne(validTenant, id);
  }
}
