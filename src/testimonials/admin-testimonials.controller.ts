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
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@ApiTags('Admin Testimonials')
@Controller('admin/:tenant/testimonials')
export class AdminTestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) { }

  private validateTenant(tenant: string): 'nattypay' | 'valarpay' {
    if (tenant !== 'nattypay' && tenant !== 'valarpay') {
      throw new BadRequestException('Invalid tenant');
    }
    return tenant;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Param('tenant') tenant: string, @Body() createTestimonialDto: CreateTestimonialDto) {
    const validTenant = this.validateTenant(tenant);
    return this.testimonialsService.create(validTenant, createTestimonialDto);
  }

  @Get()
  findAll(@Param('tenant') tenant: string) {
    const validTenant = this.validateTenant(tenant);
    return this.testimonialsService.findAll(validTenant);
  }

  @Get(':id')
  findOne(@Param('tenant') tenant: string, @Param('id') id: string) {
    const validTenant = this.validateTenant(tenant);
    return this.testimonialsService.findOne(validTenant, id);
  }

  @Put(':id')
  update(
    @Param('tenant') tenant: string,
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    const validTenant = this.validateTenant(tenant);
    return this.testimonialsService.update(validTenant, id, updateTestimonialDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('tenant') tenant: string, @Param('id') id: string) {
    const validTenant = this.validateTenant(tenant);
    this.testimonialsService.remove(validTenant, id);
  }
}
