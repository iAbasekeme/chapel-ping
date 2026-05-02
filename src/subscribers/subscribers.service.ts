import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly repo: Repository<Subscriber>,
  ) {}

  create(dto: CreateSubscriberDto): Promise<Subscriber> {
    const subscriber = this.repo.create({
      name: dto.name,
      phoneNumber: dto.phone_number,
    });
    return this.repo.save(subscriber);
  }

  findAll(): Promise<Subscriber[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findActive(): Promise<Subscriber[]> {
    return this.repo.find({ where: { active: true } });
  }

  async deactivate(id: number): Promise<Subscriber> {
    const subscriber = await this.repo.findOneBy({ id });
    if (!subscriber) {
      throw new NotFoundException(`Subscriber #${id} not found`);
    }
    subscriber.active = false;
    return this.repo.save(subscriber);
  }
}
