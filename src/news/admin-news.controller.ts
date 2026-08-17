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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@ApiTags('Admin News')
@Controller('admin/:tenant/news')
export class AdminNewsController {
  constructor(private readonly newsService: NewsService) {}

  private validateTenant(tenant: string): 'nattypay' | 'valarpay' {
    if (tenant !== 'nattypay' && tenant !== 'valarpay') {
      throw new BadRequestException('Invalid tenant');
    }
    return tenant;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Param('tenant') tenant: string, @Body() createNewsDto: CreateNewsDto) {
    const validTenant = this.validateTenant(tenant);
    return this.newsService.create(validTenant, createNewsDto);
  }

  @Get()
  findAll(@Param('tenant') tenant: string) {
    const validTenant = this.validateTenant(tenant);
    return this.newsService.findAll(validTenant);
  }

  @Get(':id')
  findOne(@Param('tenant') tenant: string, @Param('id') id: string) {
    const validTenant = this.validateTenant(tenant);
    return this.newsService.findOne(validTenant, id);
  }

  @Put(':id')
  update(
    @Param('tenant') tenant: string,
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    const validTenant = this.validateTenant(tenant);
    return this.newsService.update(validTenant, id, updateNewsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('tenant') tenant: string, @Param('id') id: string) {
    const validTenant = this.validateTenant(tenant);
    this.newsService.remove(validTenant, id);
  }
}
