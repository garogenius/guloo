import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@ApiTags('Admin FAQs')
@Controller('admin/:tenant/faqs')
export class AdminFaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  private validateTenant(tenant: string): 'nattypay' | 'valarpay' {
    if (tenant !== 'nattypay' && tenant !== 'valarpay') {
      throw new BadRequestException('Invalid tenant');
    }
    return tenant;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Param('tenant') tenant: string, @Body() createFaqDto: CreateFaqDto) {
    const validTenant = this.validateTenant(tenant);
    return this.faqsService.create(validTenant, createFaqDto);
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

  @Put(':id')
  update(
    @Param('tenant') tenant: string,
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ) {
    const validTenant = this.validateTenant(tenant);
    return this.faqsService.update(validTenant, id, updateFaqDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('tenant') tenant: string, @Param('id') id: string) {
    const validTenant = this.validateTenant(tenant);
    this.faqsService.remove(validTenant, id);
  }
}
