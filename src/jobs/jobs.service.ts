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
   * Sunday 7:30 AM WAT → "30 7 * * 0" in Africa/Lagos timezone
   */
  @Cron('30 7 * * 0', { timeZone: 'Africa/Lagos' })
  async sendSundayMorningReminder(): Promise<void> {
    this.logger.log('Running Sunday morning reminder job...');
    for (const [index, sub] of subscribers.entries()) {
      const message = `Good morning, ${sub.name}!\n\nToday is a fresh opportunity to experience God's love, strength, and peace. Come with an expectant heart, there is a blessing with your name on it.\n\nService starts at 8AM, and we'd love to worship with you.\n\nCourtesy: Foursquare Gospel Church, 22 Essien Street, Calabar.`;
      await this.smsService.send(sub.phoneNumber, message, sub.name);
      if (index < subscribers.length - 1) await this.pauseBetweenMessages();
    }

    this.logger.log(`Sunday reminder sent to ${subscribers.length} subscriber(s).`);
  }
}
