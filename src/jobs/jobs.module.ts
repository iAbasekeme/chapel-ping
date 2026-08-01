import { Module } from '@nestjs/common';
import { SmsModule } from '../sms/sms.module';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';

@Module({
  imports: [SmsModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
