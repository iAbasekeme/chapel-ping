import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SubscribersService } from '../subscribers/subscribers.service';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private readonly subscribersService: SubscribersService,
    private readonly smsService: SmsService,
  ) {}

  /**
   * Saturday 8:40 PM WAT → "40 20 * * 6" in Africa/Lagos timezone
   */
  @Cron('40 20 * * 6', { timeZone: 'Africa/Lagos' })
  async sendSaturdayReminder(): Promise<void> {
    this.logger.log('Running Saturday evening reminder job...');
    const subscribers = await this.subscribersService.findActive();

    for (const sub of subscribers) {
      const message = `Hello ${sub.name},\nJust a reminder that Youth service is on Sunday by 9AM. \nCome believing God for something, God loves you, see you there!!`;
      await this.smsService.send(sub.phoneNumber, message, sub.name);
    }

    this.logger.log(`Saturday reminder sent to ${subscribers.length} subscriber(s).`);
  }

  /**
   * Sunday 8:30 AM WAT → "30 8 * * 0" in Africa/Lagos timezone
   */
  @Cron('30 8 * * 0', { timeZone: 'Africa/Lagos' })
  async sendSundayMorningReminder(): Promise<void> {
    this.logger.log('Running Sunday morning reminder job...');
    const subscribers = await this.subscribersService.findActive();

    for (const sub of subscribers) {
      const message = `Good morning ${sub.name}, service starts in 1 hour. God bless you 🙌`;
      await this.smsService.send(sub.phoneNumber, message, sub.name);
    }

    this.logger.log(`Sunday reminder sent to ${subscribers.length} subscriber(s).`);
  }
}
