import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialsService } from './testimonials.service';
import { AdminTestimonialsController } from './admin-testimonials.controller';
import { PublicTestimonialsController } from './public-testimonials.controller';
import { Testimonial } from './testimonial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial])],
  controllers: [AdminTestimonialsController, PublicTestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule { }
