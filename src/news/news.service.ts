import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  private nattyPayNews: News[] = [];
  private valarPayNews: News[] = [];

  private getStore(tenant: 'nattypay' | 'valarpay'): News[] {
    return tenant === 'nattypay' ? this.nattyPayNews : this.valarPayNews;
  }

  create(tenant: 'nattypay' | 'valarpay', createNewsDto: CreateNewsDto): News {
    const store = this.getStore(tenant);
    const news: News = {
      id: Math.random().toString(36).substring(2, 15),
      ...createNewsDto,
      tenant,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.push(news);
    return news;
  }

  findAll(tenant: 'nattypay' | 'valarpay'): News[] {
    return this.getStore(tenant);
  }

  findOne(tenant: 'nattypay' | 'valarpay', id: string): News {
    const store = this.getStore(tenant);
    const news = store.find((news) => news.id === id);
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  update(tenant: 'nattypay' | 'valarpay', id: string, updateNewsDto: UpdateNewsDto): News {
    const store = this.getStore(tenant);
    const newsIndex = store.findIndex((news) => news.id === id);
    if (newsIndex === -1) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    const updatedNews = {
      ...store[newsIndex],
      ...updateNewsDto,
      updatedAt: new Date(),
    };
    store[newsIndex] = updatedNews;
    return updatedNews;
  }

  remove(tenant: 'nattypay' | 'valarpay', id: string): void {
    const store = this.getStore(tenant);
    const newsIndex = store.findIndex((news) => news.id === id);
    if (newsIndex === -1) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    store.splice(newsIndex, 1);
  }
}
