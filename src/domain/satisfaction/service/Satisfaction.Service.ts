import { Injectable } from '@nestjs/common';
import { UserApi } from '../infrastructure/User.Api';
import { SatisfactionStatus } from '../dto/response/SatisfactionSatus';
import { ChallengeApi } from '../infrastructure/Challenge.Api';
import { Restart } from '../dto/response/Restart';
import { TemplateApi } from '../infrastructure/Template.Api';
import { UserChallengeResult } from '../dto/response/UserChallengeResult';
import { SatisfactionHelper } from '../helper/Satisfaction.Helper';
import { SatisfactionQuestion } from '../dto/response/SatisfactionQuestion';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { ChallengeVerifyService } from 'src/global/exception/challenge/ChallengeVerify.Service';

@Injectable()
export class SatisfactionService {
  constructor(
    private readonly satisfactionHelper: SatisfactionHelper,
    private readonly userApi: UserApi,
    private readonly challengeApi: ChallengeApi,
    private readonly templateApi: TemplateApi,
    private readonly userVerifyService: UserVerifyService,
    private readonly challengeVerifyService: ChallengeVerifyService,
  ) {}

  public async bringSatisfactionStatus(userId: number, organization: string, challengeId: number) {
    // 검증하기
    const userChallengeData =
      await this.userApi.requestUserChallengeWithUserIdAndOragnizationByChallengeId(
        userId,
        organization,
        challengeId,
      );
    this.userVerifyService.verifyUserChallenge(userChallengeData);
    return SatisfactionStatus.of(userChallengeData.getReview());
  }

  public async modifySatisfactionStatus(userId: number, organization: string, challengeId: number) {
    await this.userApi.requestUpdateUserChallengeReview(userId, organization, challengeId);
  }

  public async bringUserChallengeResult(
    userId: number,
    organization: string,
    challengeId: number,
  ): Promise<UserChallengeResult> {
    // 검증하기
    const affiliationData = await this.userApi.requestAffiliationByUserIdWithOrganization(
      userId,
      organization,
    );
    this.userVerifyService.verifyAffiliation(affiliationData);
    // 검증하기
    const userChallengeData = await this.userApi.requestUserChallengeByAffiliationIdAndChallengeId(
      affiliationData.getId(),
      challengeId,
    );
    this.userVerifyService.verifyUserChallenge(userChallengeData);

    const [challengeData, challengeOverlapCount, challengeSuccessCount] = await Promise.all([
      // 검증하기
      this.challengeApi.requestChallengeById(challengeId),
      this.challengeApi.requestChallengeOverlapCount(challengeId),
      this.templateApi.reqeustChallengeSuccessChallengeCount(userChallengeData.getId()),
    ]);
    this.challengeVerifyService.verifyChallenge(challengeData);
    return UserChallengeResult.of(
      affiliationData.getNickname(),
      organization,
      challengeOverlapCount,
      challengeSuccessCount,
      userChallengeData.getUserDeposit(),
      challengeData,
    );
  }

  public async bringSatisfactionQuestion(challengeId: number): Promise<SatisfactionQuestion[]> {
    // 검증하기
    const satisfactionData = await this.satisfactionHelper.giveSatisfactionByChallengeId(
      challengeId,
      true,
    );
    return SatisfactionQuestion.of(satisfactionData);
  }

  public async bringReEngagement(challengeId: number) {
    // 검증하기
    const challengeData = await this.challengeApi.requestChallengeById(challengeId);
    this.challengeVerifyService.verifyChallenge(challengeData);
    return Restart.of(challengeData.getRestart());
  }
}
