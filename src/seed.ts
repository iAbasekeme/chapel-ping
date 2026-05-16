import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Subscriber } from './subscribers/subscriber.entity';

const subscribers = [
  { name: 'Able', phoneNumber: '2347042232834' },
  { name: 'Charles', phoneNumber: '2348032738733' },
  { name: 'Naomi', phoneNumber: '2348034884661' },
  { name: 'Rachie', phoneNumber: '2348139036191' },
  { name: 'Victoria', phoneNumber: '2349031922677' },
  { name: 'Isaac', phoneNumber: '2349041376498' },
  { name: 'Emmanuel Effanga', phoneNumber: '2348117581926' },
  { name: 'Dominic', phoneNumber: '+2349012567760'},
  { name: 'Ruth', phoneNumber: '+2348131998263'},
  { name: 'Emem', phoneNumber: '+2348138332551'},
  { name: 'Ezekial', phoneNumber: '+2348164601804' },
  { name: 'Gabriel', phoneNumber: '+2349025507428'},
  { name: 'Joy', phoneNumber: '+2347075596255'},
  { name: 'Fortune', phoneNumber: '+2349165336353'},
  { name: 'Liberty', phoneNumber: '+2349112703681'},
  { name: 'Vicky', phoneNumber: '+2349125028841'},
  { name: 'Iniobong', phoneNumber: '+2348063201428'},
  { name: 'Ruth', phoneNumber: '+2347053838612'},
  { name: 'Patience', phoneNumber: '+2348108316732'},
  { name: 'Gideon', phoneNumber: '+2348123073514'},
  { name: 'Bella', phoneNumber: '+2348161126626'},
  { name: 'Solomom', phoneNumber: '+2348160136935'},
  { name: 'Emediong', phoneNumber: '+2348052117053'},
  { name: 'Victor', phoneNumber: '+2347026601452'},
  { name: 'Victor', phoneNumber: '+2348061272715'},
  { name: 'Jennifer', phoneNumber: '+2349138661334'},
  { name: 'Justina', phoneNumber: '+2349019326546'},
  { name: 'ThankGod', phoneNumber: '+2348161126626'},
  { name: 'Immaculata', phoneNumber: '+2347033192547'},
  { name: 'Isaac', phoneNumber: '+2349041376498'},
  { name: 'Dorcas', phoneNumber: '+2348065999740'},
  { name: 'Famous', phoneNumber: '+2348155435869'},
  { name: 'Philomena', phoneNumber: '+2347036960182'}
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
