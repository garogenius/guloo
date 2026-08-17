import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { FaqsModule } from './faqs/faqs.module';

@Module({
  imports: [NewsModule, FaqsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
