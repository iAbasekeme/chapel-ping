import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Subscriber } from './subscribers/subscriber.entity';

const subscribers = [
  { name: 'Able', phoneNumber: '2347042232834' },
  { name: 'Charles', phoneNumber: '2348032738733' },
  { name: 'Naomi', phoneNumber: '2348034884661' },
  { name: 'Rachie', phoneNumber: '2348139036191' }
];

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Subscriber);

  for (const s of subscribers) {
    const exists = await repo.findOneBy({ phoneNumber: s.phoneNumber });
    if (!exists) {
      await repo.save(repo.create(s));
      console.log(`Added: ${s.name} (${s.phoneNumber})`);
    } else {
      console.log(`Skipped (already exists): ${s.name} (${s.phoneNumber})`);
    }
  }

  await AppDataSource.destroy();
  console.log('Seeding done.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
