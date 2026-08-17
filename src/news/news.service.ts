import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(tenant: 'nattypay' | 'valarpay', createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create({
      ...createNewsDto,
      tenant,
    });
    return this.newsRepository.save(news);
  }

  findAll(tenant: 'nattypay' | 'valarpay'): Promise<News[]> {
    return this.newsRepository.find({ where: { tenant }, order: { createdAt: 'DESC' } });
  }

  async findOne(tenant: 'nattypay' | 'valarpay', id: string): Promise<News> {
    const news = await this.newsRepository.findOne({ where: { id, tenant } });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(tenant: 'nattypay' | 'valarpay', id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(tenant, id);
    Object.assign(news, updateNewsDto);
    return this.newsRepository.save(news);
  }

  async remove(tenant: 'nattypay' | 'valarpay', id: string): Promise<void> {
    const news = await this.findOne(tenant, id);
    await this.newsRepository.remove(news);
  }
}
