import { Controller, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('trigger')
  async trigger() {
    await this.jobsService.sendSaturdayReminder();
    return { message: 'Reminder triggered successfully' };
  }
}
