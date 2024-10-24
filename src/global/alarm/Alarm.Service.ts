import { Injectable } from '@nestjs/common';
import { firebase } from '../config/firebase';

@Injectable()
export class AlarmService {
  public async sendPushAlarm(
    engineValues: string[],
    title: string,
    body: string,
    targetUrl: string,
  ) {
    const message = {
      tokens: engineValues,
      notification: {
        title: title,
        body: body,
      },
      webpush: {
        fcmOptions: {
          link: targetUrl,
        },
      },
    };
    const response = await firebase.messaging().sendEachForMulticast(message);
    console.log('Successfully sent message:', response);
  }
}
