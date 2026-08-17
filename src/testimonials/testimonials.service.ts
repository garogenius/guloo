import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Testimonial } from './testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
  ) {}

  async create(tenant: 'nattypay' | 'valarpay', createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = this.testimonialRepository.create({
      ...createTestimonialDto,
      tenant,
    });
    return this.testimonialRepository.save(testimonial);
  }

  findAll(tenant: 'nattypay' | 'valarpay'): Promise<Testimonial[]> {
    return this.testimonialRepository.find({ where: { tenant }, order: { createdAt: 'DESC' } });
  }

  async findOne(tenant: 'nattypay' | 'valarpay', id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepository.findOne({ where: { id, tenant } });
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return testimonial;
  }

  async update(tenant: 'nattypay' | 'valarpay', id: string, updateTestimonialDto: UpdateTestimonialDto): Promise<Testimonial> {
    const testimonial = await this.findOne(tenant, id);
    Object.assign(testimonial, updateTestimonialDto);
    return this.testimonialRepository.save(testimonial);
  }

  async remove(tenant: 'nattypay' | 'valarpay', id: string): Promise<void> {
    const testimonial = await this.findOne(tenant, id);
    await this.testimonialRepository.remove(testimonial);
  }
}
