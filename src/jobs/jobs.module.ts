import { Module } from '@nestjs/common';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { SmsModule } from '../sms/sms.module';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';

@Module({
  imports: [SubscribersModule, SmsModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
