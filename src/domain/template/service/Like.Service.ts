import { Inject, Injectable } from '@nestjs/common';
import { LikeHelper } from '../helper/Like.Helper';
import { UserApi } from '../infrastructure/User.Api';
import { LikeCount } from '../dto/response/LikeCount';
import { TemplateVerifyService } from '../../../global/exception/template/TemplateVerify.Service';
import { MutexAlgorithm } from '../../../global/decorator/mutex';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { DataMapperService } from '../domain/service/DataMappper.Service';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { LikeClickedUser } from '../dto/values/LikeClickedUser';
import { Likes } from '../domain/entity/Likes';
import { AlarmService } from 'src/global/alarm/Alarm.Service';
import { UserTemplateHelper } from '../helper/UserTemplate.Helper';
import { Transactional } from '../../../global/decorator/transaction';
import { DataSource } from 'typeorm';
import { formatDateToPushAlarmStatus } from '../util/date';
import { UserTemplate } from '../domain/entity/UserTemplate';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { ChallengeApi } from '../infrastructure/Challenge.Api';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
import { checkFirebaseToken, compareValues } from '../util/checker';
import { TemplateHandler } from './handler/TemplateHandler';
import { TemplateOperation } from './types/Operation';
import { BaseTemplateService } from './BaseTemplate.Service';

@Injectable()
export class LikeServie extends BaseTemplateService {
  // constructor(
  //   private readonly dataSource: DataSource,
  //   private readonly likeHelper: LikeHelper,
  //   private readonly userApi: UserApi,
  //   private readonly userVerifyService: UserVerifyService,
  //   private readonly templateVerifyService: TemplateVerifyService,
  //   private readonly dataMapperService: DataMapperService,
  //   private readonly alarmService: AlarmService,
  //   private readonly userTemplateHelper: UserTemplateHelper,
  //   private readonly challengeApi: ChallengeApi,
  // ) {}

  //private handleMap = new Map<string, TemplateHandler<any, any>>();
  constructor(@Inject('LIKE_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }

  // public async checkLike(likeId: number) {
  //   await this.likeHelper.executeUpdateLikeCheck(likeId);
  // }

  // @Transactional()
  // @MutexAlgorithm()
  // public async penetrateLike(
  //   userId: number,
  //   userTemplateId: number,
  //   organization: string,
  // ): Promise<LikeCount> {
  //   const [affiliationData, userTemplateData] = await Promise.all([
  //     this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization),
  //     this.userTemplateHelper.findUserTemplateById(userTemplateId),
  //   ]);
  //   const userChallengeData =
  //     await this.userApi.requestUserChallengeAndAffiliationAndUserAndFirebaseTokenById(
  //       userTemplateData.getUserChallengeId(),
  //     );
  //   const challengeData = await this.challengeApi.requestChallengeById(
  //     userChallengeData.getChallengeId(),
  //   );
  //   this.userVerifyService.verifyAffiliation(affiliationData);
  //   const checkLikeData = await this.likeHelper.giveLikeByAffiliationIdAndUserTemplateId(
  //     affiliationData.getAffiliationId(),
  //     userTemplateId,
  //   );
  //   this.templateVerifyService.verifyExistLike(checkLikeData);
  //   await this.likeHelper.executeInsertLike(affiliationData.getAffiliationId(), userTemplateId);
  //   const myLikeCheck = compareValues(
  //     affiliationData.getId(),
  //     userChallengeData.getAffiliation().getId(),
  //   );
  //   const firebaseTokenChekingResult = checkFirebaseToken(userChallengeData);
  //   this.sendLikeNotification(
  //     firebaseTokenChekingResult,
  //     myLikeCheck,
  //     userChallengeData,
  //     affiliationData,
  //     userTemplateData,
  //     challengeData,
  //   );
  //   const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
  //   return LikeCount.of(likeCount);
  // }

  // private sendLikeNotification(
  //   firebaseTokenChecking: boolean,
  //   likeStatus: string,
  //   userChallengeData: UserChallenge,
  //   affiliationData: Affiliation,
  //   userTemplateData: UserTemplate,
  //   challengeData: Challenge,
  // ) {
  //   if (likeStatus === 'others' && firebaseTokenChecking) {
  //     this.alarmService.sendPushAlarm(
  //       userChallengeData.getAffiliation().getUser().getId(),
  //       userChallengeData
  //         .getAffiliation()
  //         .getUser()
  //         .getFirebaseTokens()
  //         .map((data) => data.getEngineValue()),
  //       `${challengeData.getName()} 챌린지 좋아요 알림`,
  //       `${affiliationData.getNickname()}님이 ${formatDateToPushAlarmStatus(userTemplateData.getTemplateDate())} 템플릿에 좋아요를 표했습니다.`,
  //       `/detail/${userTemplateData.getId()}`,
  //     );
  //   }
  // }

  // public async eraseLike(
  //   userId: number,
  //   userTemplateId: number,
  //   organization: string,
  // ): Promise<LikeCount> {
  //   const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(
  //     userId,
  //     organization,
  //   );
  //   await this.likeHelper.executeDeleteLike(affiliationData.getAffiliationId(), userTemplateId);
  //   const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
  //   return LikeCount.of(likeCount);
  // }

  // public async bringLikeCount(userTemplateId: number): Promise<LikeCount> {
  //   const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
  //   return LikeCount.of(likeCount);
  // }

  // public async bringLikeClickedUser(userTemplateId: number) {
  //   const likeDatas = await this.likeHelper.giveLikesByUserTemplateId(userTemplateId);
  //   return likeDatas.length === 0 ? [] : this.processLikeClickedLogic(likeDatas);
  // }

  // private async processLikeClickedLogic(likeDatas: Likes[]) {
  //   const extractedAffiliationIds = this.dataMapperService.extractAffiliationId(likeDatas);
  //   const affiliationDatas =
  //     await this.userApi.requestAffiliationAndUserById(extractedAffiliationIds);
  //   return this.mappedClickedUser(affiliationDatas);
  // }

  // private mappedClickedUser(affiliationDatas: Affiliation[]) {
  //   return affiliationDatas.map((affiliationData) => {
  //     return LikeClickedUser.of(
  //       affiliationData.getUser().getProfileImage(),
  //       affiliationData.getNickname(),
  //     );
  //   });
  // }
}
