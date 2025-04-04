import { Injectable } from '@nestjs/common';
import { LikeClick } from '../../../dto/request/LikeClick';
import { LikeCount } from '../../../dto/response/LikeCount';
import { TemplateOperation } from '../types/Operation';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { checkFirebaseToken, compareValues } from '../../../util/checker';
import { TemplateVerifyService } from 'src/global/exception/template/TemplateVerify.Service';
import { Transactional } from 'src/global/decorator/transaction';
import { MutexAlgorithm } from 'src/global/decorator/mutex';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { UserTemplate } from '../../../domain/entity/UserTemplate';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
import { formatDateToPushAlarmStatus } from '../../../util/date';
import { AlarmService } from 'src/global/alarm/Alarm.Service';
import { DataSource } from 'typeorm';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';
import { ChallengeApi } from 'src/domain/template/application/apis/Challenge.Api';
import { LikeHelper } from 'src/domain/template/application/helper/Like.Helper';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';

@Injectable()
export class LikeRegistrant implements TemplateUseCase<[LikeClick, number], Promise<LikeCount>> {
  operation: TemplateOperation = 'INSERT_LIKE';
  constructor(
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly challengeApi: ChallengeApi,
    private readonly userVerifyService: UserVerifyService,
    private readonly likeHelper: LikeHelper,
    private readonly templateVerifyService: TemplateVerifyService,
    private readonly alarmService: AlarmService,
    private readonly dataSource: DataSource,
  ) {}

  @Transactional()
  @MutexAlgorithm()
  async handle(request: [LikeClick, number]): Promise<LikeCount> {
    const [likeClick, userId] = request;
    const [affiliationData, userTemplateData] = await Promise.all([
      this.userApi.requestAffiliationByUserIdAndOrganization(userId, likeClick.getOrganization()),
      this.userTemplateHelper.findUserTemplateById(likeClick.getUserTemplateId()),
    ]);
    const userChallengeData =
      await this.userApi.requestUserChallengeAndAffiliationAndUserAndFirebaseTokenById(
        userTemplateData.getUserChallengeId(),
      );
    const challengeData = await this.challengeApi.requestChallengeById(
      userChallengeData.getChallengeId(),
    );
    this.userVerifyService.verifyAffiliation(affiliationData);
    const checkLikeData = await this.likeHelper.giveLikeByAffiliationIdAndUserTemplateId(
      affiliationData.getAffiliationId(),
      likeClick.getUserTemplateId(),
    );
    this.templateVerifyService.verifyExistLike(checkLikeData);
    await this.likeHelper.executeInsertLike(
      affiliationData.getAffiliationId(),
      likeClick.getUserTemplateId(),
    );
    const myLikeCheck = compareValues(
      affiliationData.getId(),
      userChallengeData.getAffiliation().getId(),
    );
    const firebaseTokenChekingResult = checkFirebaseToken(userChallengeData);
    this.sendLikeNotification(
      firebaseTokenChekingResult,
      myLikeCheck,
      userChallengeData,
      affiliationData,
      userTemplateData,
      challengeData,
    );
    const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(
      likeClick.getUserTemplateId(),
    );
    return LikeCount.of(likeCount);
  }

  private sendLikeNotification(
    firebaseTokenChecking: boolean,
    likeStatus: string,
    userChallengeData: UserChallenge,
    affiliationData: Affiliation,
    userTemplateData: UserTemplate,
    challengeData: Challenge,
  ) {
    if (likeStatus === 'others' && firebaseTokenChecking) {
      this.alarmService.sendPushAlarm(
        userChallengeData.getAffiliation().getUser().getId(),
        userChallengeData
          .getAffiliation()
          .getUser()
          .getFirebaseTokens()
          .map((data) => data.getEngineValue()),
        `${challengeData.getName()} 챌린지 좋아요 알림`,
        `${affiliationData.getNickname()}님이 ${formatDateToPushAlarmStatus(userTemplateData.getTemplateDate())} 템플릿에 좋아요를 표했습니다.`,
        `/detail/${userTemplateData.getId()}`,
      );
    }
  }
}
