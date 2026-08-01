import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SmsModule } from './sms/sms.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SmsModule,
    JobsModule,
  ],
})
export class AppModule {}
