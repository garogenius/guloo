import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { AdminNewsController } from './admin-news.controller';
import { PublicNewsController } from './public-news.controller';

@Module({
  controllers: [AdminNewsController, PublicNewsController],
  providers: [NewsService],
})
export class NewsModule {}
