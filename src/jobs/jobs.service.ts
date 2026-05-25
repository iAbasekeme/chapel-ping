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
  ) { }

  /**
   * Saturday 7:50 PM WAT → "50 19 * * 6" in Africa/Lagos timezone
   */
  // @Cron('50 19 * * 6', { timeZone: 'Africa/Lagos' })
  async sendSaturdayReminder(): Promise<void> {
    this.logger.log('Running Saturday evening reminder job...');
    const subscribers = await this.subscribersService.findActive();

    for (const sub of subscribers) {
      const message = `Hello ${sub.name},\n\nSunday is almost here! Join us at 8AM Tomorrow, come expecting great things from the Lord.\n\nGod loves you, and we can't wait to see you!\n\nCourtesy: Foursquare Gospel Church, Essien`;
      await this.smsService.send(sub.phoneNumber, message, sub.name);
    }

    this.logger.log(`Saturday reminder sent to ${subscribers.length} subscriber(s).`);
  }

  /**
   * Sunday 8:30 AM WAT → "30 8 * * 0" in Africa/Lagos timezone
   */
  @Cron('30 7 * * 0', { timeZone: 'Africa/Lagos' })
  async sendSundayMorningReminder(): Promise<void> {
    this.logger.log('Running Sunday morning reminder job...');
    const subscribers = await this.subscribersService.findActive();

    for (const sub of subscribers) {
      const message = `Rise and shine, ${sub.name}!\n\nA beautiful Sunday awaits. Service starts in less than 30 minutes. We'd love to worship with you.\n\nGod loves you.\nFoursquare Gospel Church, Essien`;
      await this.smsService.send(sub.phoneNumber, message, sub.name);
    }

    this.logger.log(`Sunday reminder sent to ${subscribers.length} subscriber(s).`);
  }
}
