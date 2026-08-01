import { MigrationInterface, QueryRunner } from 'typeorm';

export const subscribers = [
  { name: 'Able', phoneNumber: '2347042232834' },
  { name: 'Charles orok Etim', phoneNumber: '2348032738733' },
  { name: 'Elder Naomi Bassey', phoneNumber: '2348034884661' },
  { name: 'Rachie', phoneNumber: '2348139036191' },
  { name: 'Victoria', phoneNumber: '2349031922677' },
  { name: 'Isaac', phoneNumber: '2349041376498' },
  { name: 'Emmanuel Effanga', phoneNumber: '2348117581926' },
  { name: 'Dominic', phoneNumber: '2349012567760' },
  { name: 'Ruth', phoneNumber: '2348131998263' },
  { name: 'Emem Asuquo', phoneNumber: '2348138332551' },
  { name: 'David Ezekiel Monday', phoneNumber: '2348164601804' },
  { name: 'Gabriel', phoneNumber: '2349025507428' },
  { name: 'Joy', phoneNumber: '2347075596255' },
  { name: 'Fortune', phoneNumber: '2349165336353' },
  { name: 'Liberty', phoneNumber: '2349112703681' },
  { name: 'Vicky', phoneNumber: '2349125028841' },
  { name: 'Iniobong', phoneNumber: '2348063201428' },
  { name: 'Asuquo Ruth Michael', phoneNumber: '2347053838612' },
  { name: 'Iniedy Patience Umoh', phoneNumber: '2348108316732' },
  { name: 'Gideon', phoneNumber: '2348123073514' },
  { name: 'Etta Bella Daniel', phoneNumber: '2348161126626' },
  { name: 'Solomon', phoneNumber: '2348160136935' },
  { name: 'Emediong', phoneNumber: '2348052117053' },
  { name: 'Victor', phoneNumber: '2347026601452' },
  { name: 'Victor Bassey', phoneNumber: '2348061272715' },
  { name: 'Odong Jennifer Udah', phoneNumber: '2349138661334' },
  { name: 'Williams Justina Odudu', phoneNumber: '2349019326546' },
  { name: 'Immaculata Gevelo Bassey', phoneNumber: '2347033192547' },
  { name: 'Inyang Dorcas Ofem', phoneNumber: '2348065999740' },
  { name: 'Famous Ogar', phoneNumber: '2348155435869' },
  { name: 'Philomena Charles', phoneNumber: '2347036960182' },
  { name: 'Pastor Cobham', phoneNumber: '2348032548394' },
  { name: 'Etim Sunday', phoneNumber: '2347016655679' },
  { name: 'Comfort S. Etim', phoneNumber: '2348124702548' },
  { name: 'Stanley Edet', phoneNumber: '2348089092572' },
  { name: 'Roseline Christopher', phoneNumber: '2347038694724' },
  { name: 'Mercy Moses Asuquo', phoneNumber: '2348020882819' },
  { name: 'Marcel Friday', phoneNumber: '2347045310730' },
  { name: 'Sis Queen', phoneNumber: '2348025827644' },
  { name: 'Bro Effiong Solomon', phoneNumber: '2349022766384' },
  { name: 'Sis Elizabeth Iniobong', phoneNumber: '2349116358477' },
  { name: 'Victoria Friday Etim', phoneNumber: '2347061588973' },
  { name: 'Bro Gospel Ami Clerk', phoneNumber: '2347033721583' },
  { name: 'Bassey ThankGod Jonathan', phoneNumber: '2348166097096' },
  { name: 'Queen Bernice Ancah', phoneNumber: '2348133305691' },
  { name: 'Emediong Inyang Oseb', phoneNumber: '2348051297066' },
  { name: 'Adepeke Kare Richard', phoneNumber: '2347094732897' },
  { name: 'Andiong Dominic', phoneNumber: '2349012561760' },
  { name: 'Deacon Michael Samuels', phoneNumber: '2349023878256' },
  { name: 'Sis Josephine Solomon', phoneNumber: '2349022763087' },
  { name: 'Joy Inyang Joseph', phoneNumber: '2349024357621' },
  { name: 'Janet & Udo', phoneNumber: '2347025328455' },
  { name: 'Akpan Udo', phoneNumber: '2347026600452' },
  { name: 'Mfon Michael Asuquo', phoneNumber: '2347042141302' },
  { name: 'Iniobong Bassey', phoneNumber: '2348062370148' },
  { name: 'Sis Eno Inyang Joseph', phoneNumber: '2347038637532' },
  { name: 'Ekernya Margaret Elam', phoneNumber: '2348101731281' },
  { name: 'Inyang Blessing Ofem', phoneNumber: '2349066097064' },
  { name: 'Joseph Saviour Inyang', phoneNumber: '2349065231447' },
  { name: 'Christian Happiness Augustine', phoneNumber: '2348147767592' },
  { name: 'Famous Adedey Ogar', phoneNumber: '2348164081975' },
  { name: 'Escorette S. Ekemekong', phoneNumber: '2348109899065' },
  { name: 'Ofem Joy Inyang', phoneNumber: '2348163961357' },
  { name: 'Etim Favour Edet', phoneNumber: '2349134046459' },
  { name: 'Asor Joseph Udong', phoneNumber: '2349049045664' },
  { name: 'Owuabasi Gideon', phoneNumber: '2349039458118' },
  { name: 'Effiong Effiong Okon', phoneNumber: '2347063858557' },
  { name: 'Gideon Michael Asuquo', phoneNumber: '2348142122062' },
  { name: 'Inyang Joseph Jacob', phoneNumber: '2348143305909' },
  { name: 'Bro Joseph Inyang Joseph', phoneNumber: '2348140862982' },
  { name: 'Gabriel Michael Asuquo', phoneNumber: '2349069170891' },
  { name: 'Ternet Bassey', phoneNumber: '2349113542625' },
  { name: 'Okon Christopher Iquwe', phoneNumber: '2347081968942' },
  { name: 'Okon Christopher Iquwe', phoneNumber: '2347040673757' },
  { name: 'Uyime Godwin Bassey', phoneNumber: '2348136293596' },
  { name: 'Blessing Michael', phoneNumber: '2347063336540' },
  { name: 'Christopher Okon Ibuk', phoneNumber: '2348087873355' },
  { name: 'Ogar Regina Archiane', phoneNumber: '2349129039663' },
  { name: 'Tertsea Solomon', phoneNumber: '2349048649997' },
  { name: 'Kelvin Paul', phoneNumber: '2348140017835' },
  { name: 'Happiness', phoneNumber: '2348147267592' },
  { name: 'Friday Enang', phoneNumber: '2347084766404' },
  { name: 'Esther', phoneNumber: '2349123294289' },
  { name: 'Obeten Bright', phoneNumber: '2348069257587' },
  { name: 'Eme Ayi', phoneNumber: '2348036717998' },
];

function phoneVariants(phoneNumber: string): string[] {
  const normalized = phoneNumber.replace(/\D/g, '').replace(/^0/, '234');
  const local = normalized.startsWith('234') ? `0${normalized.slice(3)}` : normalized;

  return Array.from(new Set([normalized, `+${normalized}`, local]));
}

export class SeedSubscribers1779490000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const subscriber of subscribers) {
      const [phoneNumber] = phoneVariants(subscriber.phoneNumber);
      const existing = await queryRunner.query(
        `SELECT id FROM "subscribers" WHERE phone_number = ANY($1) LIMIT 1`,
        [phoneVariants(phoneNumber)],
      );

      if (existing.length > 0) {
        continue;
      }

      await queryRunner.query(
        `INSERT INTO "subscribers" ("name", "phone_number", "active") VALUES ($1, $2, true)`,
        [subscriber.name, phoneNumber],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const subscriber of subscribers) {
      await queryRunner.query(
        `DELETE FROM "subscribers" WHERE phone_number = ANY($1)`,
        [phoneVariants(subscriber.phoneNumber)],
      );
    }
  }
}
