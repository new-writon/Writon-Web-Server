import { Injectable } from '@nestjs/common';
import { SmallTalkCommentHelper } from '../helper/SmallTalkComment.Helper';
import { UserApi } from '../infrastructure/User.Api';
import { SmallTalkCommentRead } from '../dto/response/SmallTalkCommentRead';
import { ParticularSmallTalkCommentData } from '../dto/values/ParticularSmallTalkCommentData';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { SmallTalkHelper } from '../helper/SmallTalk.Helper';
import { AlarmService } from 'src/global/alarm/Alarm.Service';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
import { ChallengeApi } from '../infrastructure/Challenge.Api';

@Injectable()
export class SmallTalkCommentService {
  constructor(
    private readonly smallTalkCommentHelper: SmallTalkCommentHelper,
    private readonly smallTalkHelper: SmallTalkHelper,
    private readonly userApi: UserApi,
    private readonly alarmService: AlarmService,
    private readonly challengeApi: ChallengeApi,
  ) {}

  public async penetrateSmallTalkComment(
    userId: number,
    smallTalkId: number,
    organization: string,
    agoraComment: string,
  ): Promise<void> {
    const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(
      userId,
      organization,
    );
    await this.smallTalkCommentHelper.executeInsertSmallTalkComment(
      smallTalkId,
      affiliationData.getId(),
      agoraComment,
    );
    const smallTalk = await this.smallTalkHelper.giveSmallTalkById(smallTalkId);
    const [userChallenges, challenge] = await Promise.all([
      this.userApi.requestUserChallengeAndAffiliationAndUserAndFirebaseTokenByChallengeId(
        smallTalk.getChallengeId(),
      ),
      this.challengeApi.requestChallengeById(smallTalk.getChallengeId()),
    ]);
    this.sendSmallTalkNotification(
      userChallenges,
      affiliationData,
      challenge,
      organization,
      agoraComment,
    );
  }

  public async sendSmallTalkNotification(
    userChallenges: UserChallenge[],
    creator: Affiliation,
    challenge: Challenge,
    organization: string,
    comment: string,
  ) {
    const userFirebaseTokenGroups = userChallenges
      .map((userChallenge) => userChallenge.affiliation)
      .filter((affiliation) => affiliation.getAffiliationId() !== creator.getAffiliationId())
      .map((affiliation) => ({
        userId: affiliation.user.userId,
        nickName: affiliation.getNickname(),
        firebaseTokens: affiliation.user.firebaseTokens ?? [],
      }))
      .filter((entry) => entry.firebaseTokens.length > 0);
    await Promise.all(
      userFirebaseTokenGroups.map((group) => {
        const engineValues = group.firebaseTokens.map((token) => token.engineValue);
        return this.alarmService.sendPushAlarm(
          group.userId,
          engineValues,
          `🚨${organization} ${challenge.getName()}챌린지 스몰톡 댓글 알림🚨$`,
          `${creator.getNickname()}님이 '${comment}' 라고 댓글을 남기셨습니다. `,
          'https://your-url.com',
        );
      }),
    );
  }

  public async bringSmallTalkCommentRead(
    userId: number,
    smallTalkId: number,
  ): Promise<SmallTalkCommentRead[]> {
    const agoraCommentData =
      await this.smallTalkCommentHelper.giveSmallTalkCommentBySmallTalkId(smallTalkId);
    return agoraCommentData.length === 0
      ? []
      : this.proccessSmallTalkCommentData(agoraCommentData, userId);
  }

  private async proccessSmallTalkCommentData(
    smallTalkCommentData: ParticularSmallTalkCommentData[],
    userId: number,
  ) {
    const extractedAffiliationId = this.extractAffiliationId(smallTalkCommentData);
    const affiliationData =
      await this.userApi.requestAffiliationAndUserById(extractedAffiliationId);
    return this.mergeParticularSmallTalkComment(smallTalkCommentData, affiliationData, userId);
  }

  private extractAffiliationId(particularCommentData: ParticularSmallTalkCommentData[]) {
    return particularCommentData.map((particularCommentData) =>
      particularCommentData.getAffiliationId(),
    );
  }

  private mergeParticularSmallTalkComment(
    particularCommentData: ParticularSmallTalkCommentData[],
    affiliationData: Affiliation[],
    userId: number,
  ): SmallTalkCommentRead[] {
    return affiliationData.flatMap((affiliationData) => {
      return particularCommentData
        .filter(
          (particularCommentData) =>
            affiliationData.getId() === particularCommentData.getAffiliationId(),
        )
        .map((particularCommentData) => {
          const distinguishedUser = this.distinguishUser(affiliationData.user.getId(), userId);
          return SmallTalkCommentRead.of(
            particularCommentData,
            affiliationData.getNickname(),
            affiliationData.user.getProfileImage(),
            distinguishedUser,
          );
        });
    });
  }

  private distinguishUser(relativeUserId: number, relativedUserId: number): string {
    if (relativeUserId === relativedUserId) {
      return '1';
    }
    return '0';
  }
}
