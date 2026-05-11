import { Controller, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('trigger/saturday-reminder')
  async trigger() {
    await this.jobsService.sendSaturdayReminder();
    return { message: 'Reminder triggered successfully' };
  }

  @Post('trigger/Sunday-morning-reminder')
  async triggerSundayMorningReminder() {
    await this.jobsService.sendSundayMorningReminder();
    return { message: 'Sunday morning reminder triggered successfully' };
  }
}
