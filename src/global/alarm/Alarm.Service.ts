import { Injectable } from '@nestjs/common';
import { firebase } from '../config/firebase';
import { UserHelper } from 'src/domain/user/helper/User.Helper';

@Injectable()
export class AlarmService {
  constructor(private readonly userHelper: UserHelper) {}

  public async sendPushAlarm(
    userId: number,
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
          data: targetUrl,
          actions: [
            {
              action: targetUrl,
              title: 'Open Web',
            },
          ],
        },
        fcmOptions: {
          link: targetUrl,
        },
      },
    };

    try {
      const response = await firebase.messaging().sendEachForMulticast(message);
      const failedTokens = this.getFailedTokens(response, engineValues);
      await this.handleFailedTokens(userId, failedTokens);
    } catch (error) {}
  }

  private async handleFailedTokens(userId: number, failedTokens: string[]): Promise<void> {
    if (failedTokens.length > 0) {
      await this.removeTokensFromDatabase(userId, failedTokens);
    }
  }

  private getFailedTokens(response: any, originalTokens: string[]): string[] {
    return response.responses.reduce((acc, res, index) => {
      if (!res.success && res.error?.code === 'messaging/registration-token-not-registered') {
        acc.push(originalTokens[index]);
      }
      return acc;
    }, [] as string[]);
  }

  private async removeTokensFromDatabase(userId: number, tokens: string[]) {
    console.log('Tokens to remove from database:', tokens);
    await this.userHelper.executeDeleteFirebaseTokens(userId, tokens);
  }
}
