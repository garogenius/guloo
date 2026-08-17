import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { FAQ } from './faq.entity';

@Injectable()
export class FaqsService {
  private nattyPayFaqs: FAQ[] = [];
  private valarPayFaqs: FAQ[] = [];

  private getStore(tenant: 'nattypay' | 'valarpay'): FAQ[] {
    return tenant === 'nattypay' ? this.nattyPayFaqs : this.valarPayFaqs;
  }

  create(tenant: 'nattypay' | 'valarpay', createFaqDto: CreateFaqDto): FAQ {
    const store = this.getStore(tenant);
    const faq: FAQ = {
      id: Math.random().toString(36).substring(2, 15),
      ...createFaqDto,
      tenant,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.push(faq);
    return faq;
  }

  findAll(tenant: 'nattypay' | 'valarpay'): FAQ[] {
    return this.getStore(tenant);
  }

  findOne(tenant: 'nattypay' | 'valarpay', id: string): FAQ {
    const store = this.getStore(tenant);
    const faq = store.find((faq) => faq.id === id);
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return faq;
  }

  update(tenant: 'nattypay' | 'valarpay', id: string, updateFaqDto: UpdateFaqDto): FAQ {
    const store = this.getStore(tenant);
    const faqIndex = store.findIndex((faq) => faq.id === id);
    if (faqIndex === -1) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    const updatedFaq = {
      ...store[faqIndex],
      ...updateFaqDto,
      updatedAt: new Date(),
    };
    store[faqIndex] = updatedFaq;
    return updatedFaq;
  }

  remove(tenant: 'nattypay' | 'valarpay', id: string): void {
    const store = this.getStore(tenant);
    const faqIndex = store.findIndex((faq) => faq.id === id);
    if (faqIndex === -1) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    store.splice(faqIndex, 1);
  }
}
