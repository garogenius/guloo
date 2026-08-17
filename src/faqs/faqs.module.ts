import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { AdminFaqsController } from './admin-faqs.controller';
import { PublicFaqsController } from './public-faqs.controller';

@Module({
  controllers: [AdminFaqsController, PublicFaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
