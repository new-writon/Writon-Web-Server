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
      webpush: {
        notification: {
          title: title,
          body: body,
          actions: [
            {
              action: targetUrl,
              title: 'Open Web',
            },
          ],
          data: {
            url: targetUrl, // 사용자 정의 데이터
          },
          renotify: true,
        },
        fcmOptions: {
          link: targetUrl,
        },
      },
    };
    const response = await firebase.messaging().sendEachForMulticast(message);
    console.log('Successfully sent message:', response);
  }
}
