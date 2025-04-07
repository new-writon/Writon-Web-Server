import { Injectable } from '@nestjs/common';
import { UserHelper } from '../helper/User.Helper';
import { UserVerifyService } from '../../../global/exception/user/UserVerify.Service';
import { checkData } from '../util/checker';
import { AlarmStatus } from '../dto/values/AlarmStatus';

@Injectable()
export class UserService {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly userVerifyService: UserVerifyService,
  ) {}

  public async modifyAccount(accountNumber: string, bank: string, userId: number): Promise<void> {
    const userData = await this.userHelper.giveUserById(userId);
    this.userVerifyService.verifyUser(userData);
    await this.userHelper.executeUpdateAccount(accountNumber, bank, userId);
  }

  public async penetrateEngineValue(userId: number, engineValue: string) {
    const firebaseTokenData = await this.userHelper.giveFirebaseTokenByUserIdAndEngineValue(
      userId,
      engineValue,
    );
    const flag = checkData(firebaseTokenData);
    await this.insertFirebaseTokenIfNotExists(flag, userId, engineValue);
  }

  private async insertFirebaseTokenIfNotExists(flag: boolean, userId: number, engineValue: string) {
    if (!flag) {
      await this.userHelper.executeInsertFirebaseToken(userId, engineValue);
    }
  }

  public async updateAlarmStatus(userId: number, content: string) {
    await this.userHelper.executeUpdateAlarm(userId, content);
  }

  public async bringAlarmStatus(userId: number): Promise<AlarmStatus> {
    const userData = await this.userHelper.giveUserById(userId);
    return AlarmStatus.of(userData.getAlarm());
  }
}
