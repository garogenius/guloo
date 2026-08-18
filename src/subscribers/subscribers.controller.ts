import {
  Controller,
  Post,
  Body,
  Param,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@ApiTags('Subscribers')
@Controller(':tenant/subscribe')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  private validateTenant(tenant: string): 'nattypay' | 'valarpay' {
    if (tenant !== 'nattypay' && tenant !== 'valarpay') {
      throw new BadRequestException('Invalid tenant');
    }
    return tenant;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Subscribe a user with email' })
  subscribe(
    @Param('tenant') tenant: string,
    @Body() createSubscriberDto: CreateSubscriberDto,
  ) {
    const validTenant = this.validateTenant(tenant);
    return this.subscribersService.subscribe(validTenant, createSubscriberDto);
  }

  // Optional endpoints for admin/management
  @Get('/admin')
  @ApiOperation({ summary: 'Get all subscribers for a tenant' })
  findAll(@Param('tenant') tenant: string) {
    const validTenant = this.validateTenant(tenant);
    return this.subscribersService.findAll(validTenant);
  }

  @Delete('/admin/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a subscriber' })
  remove(@Param('tenant') tenant: string, @Param('id') id: string) {
    const validTenant = this.validateTenant(tenant);
    return this.subscribersService.remove(validTenant, id);
  }
}
