import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SmsService } from '../sms/sms.service';
import { subscribers } from '../migrations/1779490000000-SeedSubscribers';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private readonly smsService: SmsService) {}

  private async pauseBetweenMessages(): Promise<void> {
    const delayMs = Number(process.env.SMS_SEND_DELAY_MS ?? 250);
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  /**
   * Saturday 7:50 PM WAT → "50 19 * * 6" in Africa/Lagos timezone
   */
  // @Cron('50 19 * * 6', { timeZone: 'Africa/Lagos' })
  async sendSaturdayReminder(): Promise<void> {
    this.logger.log('Running Saturday evening reminder job...');
    for (const [index, sub] of subscribers.entries()) {
      const message = `Hello ${sub.name},\n\nSunday is almost here! Join us at 8AM Tomorrow, come expecting great things from the Lord.\n\nGod loves you, and we can't wait to see you!\n\nCourtesy: Foursquare Gospel Church, 22 Essien Street, Calabar.`;
      await this.smsService.send(sub.phoneNumber, message, sub.name);
      if (index < subscribers.length - 1) await this.pauseBetweenMessages();
    }

    this.logger.log(`Saturday reminder sent to ${subscribers.length} subscriber(s).`);
  }

  /**
   * Sunday 8:30 AM WAT → "30 8 * * 0" in Africa/Lagos timezone
   */
  @Cron('30 7 * * 0', { timeZone: 'Africa/Lagos' })
  async sendSundayMorningReminder(): Promise<void> {
    this.logger.log('Running Sunday morning reminder job...');
    for (const [index, sub] of subscribers.entries()) {
      const message = `Rise and shine, ${sub.name}!\n\nA beautiful Sunday awaits. Service starts in less than 30 minutes. We'd love to worship with you.\n\nGod loves you.\n\nCourtesy: Foursquare Gospel Church, 22 Essien Street, Calabar.`;
      await this.smsService.send(sub.phoneNumber, message, sub.name);
      if (index < subscribers.length - 1) await this.pauseBetweenMessages();
    }

    this.logger.log(`Sunday reminder sent to ${subscribers.length} subscriber(s).`);
  }
}
