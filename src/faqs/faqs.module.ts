import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqsService } from './faqs.service';
import { AdminFaqsController } from './admin-faqs.controller';
import { PublicFaqsController } from './public-faqs.controller';
import { FAQ } from './faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FAQ])],
  controllers: [AdminFaqsController, PublicFaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
