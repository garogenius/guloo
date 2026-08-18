import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
  ) {}

  async subscribe(tenant: 'nattypay' | 'valarpay', createSubscriberDto: CreateSubscriberDto) {
    const existing = await this.subscriberRepository.findOne({
      where: { email: createSubscriberDto.email, tenant },
    });

    if (existing) {
      throw new ConflictException('Email is already subscribed');
    }

    const subscriber = this.subscriberRepository.create({
      ...createSubscriberDto,
      tenant,
    });
    return this.subscriberRepository.save(subscriber);
  }

  async findAll(tenant: 'nattypay' | 'valarpay') {
    return this.subscriberRepository.find({ where: { tenant }, order: { createdAt: 'DESC' } });
  }

  async remove(tenant: 'nattypay' | 'valarpay', id: string) {
    await this.subscriberRepository.delete({ id, tenant });
  }
}
