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
   * Saturday 8:00 PM WAT (UTC+1) → "0 19 * * 6" in UTC
   * WAT is UTC+1, so 20:00 WAT = 19:00 UTC
   */
  @Cron('0 19 * * 6', { timeZone: 'Africa/Lagos' })
  async sendSaturdayReminder(): Promise<void> {
    this.logger.log('Running Saturday evening reminder job...');
    const subscribers = await this.subscribersService.findActive();

    for (const sub of subscribers) {
      const message = `Hey ${sub.name}, just a reminder that church service is tomorrow by 9AM. See you there 🙏`;
      await this.smsService.send(sub.phoneNumber, message, sub.name);
    }

    this.logger.log(`Saturday reminder sent to ${subscribers.length} subscriber(s).`);
  }

  /**
   * Sunday 8:00 AM WAT (UTC+1) → "0 8 * * 0" in Africa/Lagos timezone
   */
  @Cron('0 8 * * 0', { timeZone: 'Africa/Lagos' })
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
