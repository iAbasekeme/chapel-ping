import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Subscriber } from './subscribers/subscriber.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  entities: [Subscriber],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
