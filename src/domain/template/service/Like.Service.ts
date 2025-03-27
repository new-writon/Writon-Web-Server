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

  constructor(@Inject('LIKE_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }

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
