import { Injectable } from '@nestjs/common';
import { SmallTalkHelper } from '../helper/SmallTalk.Helper';
import { UserApi } from '../infrastructure/User.Api';
import { ParticularSmallTalkData } from '../dto/values/ParticularSmallTalkData';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { SmallTalkResult } from '../dto/response/SmallTalkAddResult';
import { SmallTalkDataResult } from '../dto/response/SmallTalkDataResult';
import { SmallTalkException } from '../../../global/exception/smalltalk/SmallTalkException';
import { SmallTalkErrorCode } from '../../../global/exception/smalltalk/SmallTalkErrorCode';
import { getTodayDateString } from '../util/date';
import { SmallTalk } from '../domain/entity/SmallTalk';
import { MutexAlgorithm } from '../../../global/decorator/mutex';

@Injectable()
export class SmallTalkService {
  constructor(
    private readonly smallTalkHelper: SmallTalkHelper,
    private readonly userApi: UserApi,
  ) {}

  public async checkSmallTalk(
    challengeId: number,
    date: string,
  ): Promise<SmallTalkResult> {
    const particularSmallTalkData =
      await this.smallTalkHelper.giveParticularSmallTalkByChallengeIdAndDate(
        challengeId,
        date,
      );
    const smallTalkLimitResult = this.checkSmallTalkLimit(
      particularSmallTalkData,
    );
    return SmallTalkResult.of(smallTalkLimitResult);
  }

  @MutexAlgorithm()
  public async penetrateSmallTalk(
    userId: number,
    challengeId: number,
    organization: string,
    question: string,
  ): Promise<void> {
    await this.validateSmallTalkCount(challengeId, getTodayDateString());
    const userChallengeData =
      await this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(
        challengeId,
        userId,
        organization,
      );
    await this.smallTalkHelper.executeInsertSmallTalk(
      challengeId,
      userChallengeData.getId(),
      question,
    );
  }

  private async validateSmallTalkCount(challengeId: number, date: string) {
    const smallTalkData =
      await this.smallTalkHelper.giveSmallTalkByChallengeIdAndDate(
        challengeId,
        date,
      );
    if (!this.checkSmallTalkLimit(smallTalkData)) {
      throw new SmallTalkException(SmallTalkErrorCode.CANT_ADD_SMALL_TALK);
    }
  }

  public async bringSmallTalk(
    userId: number,
    challengeId: number,
    date: string,
  ) {
    const particularSmallTalkData =
      await this.smallTalkHelper.giveParticularSmallTalkByChallengeIdAndDate(
        challengeId,
        date,
      );
    return particularSmallTalkData.length === 0
      ? []
      : this.proccessSmallTalkData(
          particularSmallTalkData,
          userId,
          challengeId,
        );
  }

  private async proccessSmallTalkData(
    particularSmallTalkData: ParticularSmallTalkData[],
    userId: number,
    challengeId: number,
  ) {
    const userChallengeId = this.sortUserChallengeId(particularSmallTalkData);
    const userChallengeData =
      await this.userApi.requestUserChallengeAndAffiliationAndUserByUserChallengeIdAndChallengeId(
        userChallengeId,
        challengeId,
      );
    return this.mergeUserChallenge(
      particularSmallTalkData,
      userChallengeData,
      userId,
    );
  }

  private sortUserChallengeId(smallTalk: ParticularSmallTalkData[]) {
    return smallTalk.map((smallTalkData) => smallTalkData.getUserChallengeId());
  }

  private mergeUserChallenge(
    particularSmallTalkData: ParticularSmallTalkData[],
    userChallenge: UserChallenge[],
    userId: number,
  ): SmallTalkDataResult[] {
    return userChallenge.flatMap((userChallenge) => {
      return particularSmallTalkData
        .filter(
          (particularSmallTalkData) =>
            userChallenge.getId() ===
            particularSmallTalkData.getUserChallengeId(),
        )
        .map((particularSmallTalkData) => {
          const distinguishedUser = this.distinguishUser(
            userChallenge.affiliation.user.getId(),
            userId,
          );
          return SmallTalkDataResult.of(
            particularSmallTalkData,
            userChallenge.affiliation.getNickname(),
            userChallenge.affiliation.user.getProfileImage(),
            distinguishedUser,
          );
        });
    });
  }

  private distinguishUser(
    relativeUserId: number,
    relativedUserId: number,
  ): string {
    if (relativeUserId === relativedUserId) {
      return '1';
    }
    return '0';
  }

  private checkSmallTalkLimit(
    smallTalk: ParticularSmallTalkData[] | SmallTalk[],
  ) {
    if (smallTalk.length >= 3) {
      return false;
    }
    return true;
  }
}
