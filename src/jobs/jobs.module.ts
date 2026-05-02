import { Module } from '@nestjs/common';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { SmsModule } from '../sms/sms.module';
import { JobsService } from './jobs.service';

@Module({
  imports: [SubscribersModule, SmsModule],
  providers: [JobsService],
})
export class JobsModule {}
