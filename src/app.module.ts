import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { SubscribersModule } from './subscribers/subscribers.module';
import { SmsModule } from './sms/sms.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true, // set to false in production; use migrations instead
    }),
    ScheduleModule.forRoot(),
    SubscribersModule,
    SmsModule,
    JobsModule,
  ],
})
export class AppModule {}
