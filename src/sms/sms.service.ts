import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsService {
  private readonly apiUrl = 'https://api.ng.termii.com/api/sms/send';

  async send(to: string, message: string, recipientName: string): Promise<void> {
    const payload = {
      to,
      from: process.env.TERMII_SENDER_ID,
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: process.env.TERMII_API_KEY,
    };

    try {
      const response = await axios.post(this.apiUrl, payload);
      console.log(
        `[SMS] Sent to ${recipientName} (${to}): "${message}" — status: ${response.data?.message ?? 'ok'}`,
      );
    } catch (error) {
      const detail = error.response?.data ?? error.message;
      console.error(
        `[SMS] Failed to send to ${recipientName} (${to}):`,
        detail,
      );
    }
  }
}
