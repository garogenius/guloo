import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { AdminNewsController } from './admin-news.controller';
import { PublicNewsController } from './public-news.controller';
import { News } from './news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [AdminNewsController, PublicNewsController],
  providers: [NewsService],
})
export class NewsModule {}
