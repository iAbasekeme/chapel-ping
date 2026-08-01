import 'dotenv/config';
import 'reflect-metadata';
import { In } from 'typeorm';
import { AppDataSource } from './data-source';
import { Subscriber } from './subscribers/subscriber.entity';
import { subscribers } from './migrations/1779490000000-SeedSubscribers';

function phoneVariants(phoneNumber: string): string[] {
  const normalized = phoneNumber.replace(/\D/g, '').replace(/^0/, '234');
  const local = normalized.startsWith('234') ? `0${normalized.slice(3)}` : normalized;

  return Array.from(new Set([normalized, `+${normalized}`, local]));
}

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Subscriber);
  const seenPhoneNumbers = new Set<string>();

  for (const subscriber of subscribers) {
    const phoneNumber = phoneVariants(subscriber.phoneNumber)[0];

    if (seenPhoneNumbers.has(phoneNumber)) {
      console.log(`Skipped (duplicate in seed): ${subscriber.name} (${phoneNumber})`);
      continue;
    }

    seenPhoneNumbers.add(phoneNumber);

    const exists = await repo.findOne({
      where: { phoneNumber: In(phoneVariants(phoneNumber)) },
    });

    if (!exists) {
      await repo.save(repo.create({ ...subscriber, phoneNumber }));
      console.log(`Added: ${subscriber.name} (${phoneNumber})`);
    } else {
      console.log(`Skipped (already exists): ${subscriber.name} (${phoneNumber})`);
    }
  }

  await AppDataSource.destroy();
  console.log('Seeding done.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
