import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Subscriber } from './subscribers/subscriber.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [Subscriber],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
