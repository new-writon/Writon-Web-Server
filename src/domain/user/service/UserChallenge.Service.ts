import { Inject, Injectable } from '@nestjs/common';
import { AffiliationRepository } from '../domain/repository/Affiliation.Repository.js';
import { UserTemplateHelper } from '../../../domain/template/helper/UserTemplate.Helper.js';
import { UserTemplete } from '../../../domain/template/domain/entity/UserTemplete.js';
import { Affiliation } from '../domain/entity/Affiliation.js';
import { checkData } from '../util/checker.js';
import { TemplateStatus } from '../dto/response/TemplateStatus.js';
import { UserChallengeSituation } from '../dto/response/UserChallengeSituation.js';
import { UserRepository } from '../domain/repository/User.Repository.js';
import { ChallengeHelper } from '../../../domain/challenge/helper/Challenge.Helper.js';
import { ChallengeDayHelper } from '../../../domain/challenge/helper/ChallengeDay.Helper.js';
import { UserChallengeRepository } from '../domain/repository/UserChallenge.Repository.js';
import { Period } from 'src/domain/challenge/dto/response/Period.js';
import { sortCallendarDateBadge } from '../util/badge.js'
import { CalendarData } from '../dto/response/CalendarData.js';
import { Calendar } from '../dto/response/Calendar.js';

@Injectable()
export class UserChallengeService {
    constructor(
        @Inject('implaffiliation')
        private readonly affiliationRepository: AffiliationRepository,
        @Inject('impluser')
        private readonly userRepository: UserRepository,
        private readonly userTemplateHelper: UserTemplateHelper,
        private readonly challengeHelper: ChallengeHelper,
        private readonly challengeDayHelper: ChallengeDayHelper,
        @Inject('impluserchallenge')
        private readonly userChallengeRepository: UserChallengeRepository

      
    ) {}

    public async signTodayTemplateStatus(userId: number, organization: string, challengeId: number): Promise<TemplateStatus>{

        const affiliationData: Affiliation = await this.affiliationRepository.findAffiliationByUserIdAndOrganization(userId, organization);
        const userTemplateData : UserTemplete[] = await this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeId(affiliationData.getAffiliationId(), challengeId );
        const todayTemplateStatus : boolean = this.verifyTodayTemplateStatus(userTemplateData);
        return TemplateStatus.of(todayTemplateStatus);
    }

    public async presentSituation(userId: number, organization: string, challengeId: number): Promise<UserChallengeSituation>{
      
        const affiliationData: Affiliation = await this.affiliationRepository.findAffiliationByUserIdAndOrganization(userId, organization);
        const [userData, overlapPeriod, challengeOverlapCount, challengeSuccessCount, overlapDeposit, challengeData] = await Promise.all([
            this.userRepository.selectUserById(userId),    
            this.challengeHelper.giveOverlapPeriod(challengeId),
            this.challengeDayHelper.giveOverlapCount(challengeId),
            this.userTemplateHelper.giveSuccessChallengeCount(affiliationData.getAffiliationId(), challengeId),
            this.userChallengeRepository.findUserChallengeByAffiliationIdAndId(affiliationData.getAffiliationId(), challengeId),
            this.challengeHelper.giveChallengeById(challengeId)  
          ]);
        return UserChallengeSituation.of(
            affiliationData.getNickname(),
            userData.getProfileImage(),
            organization,
            challengeData.getName(),
            overlapPeriod,
            challengeData.getRefundCondition(),
            challengeOverlapCount,
            challengeSuccessCount,
            overlapDeposit.getUserDeposit(),
            challengeData.getDeposit()
        );
    };


   public async bringCalendarData(userId: number, organization: string, challengeId: number): Promise<CalendarData[]>{
      
        const [affiliationData, challengeDayData] = await Promise.all([
            this.affiliationRepository.findAffiliationByUserIdAndOrganization(userId, organization),
            this.challengeDayHelper.giveChallengeDayByChallengeId(challengeId) 
        ]);
        const userTemplateData = await this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeId(affiliationData.getAffiliationId(), challengeId);
        const calendarData : CalendarData[] = sortCallendarDateBadge(challengeDayData, userTemplateData);
        return calendarData;
    };



    private  verifyTodayTemplateStatus(userTemplete: UserTemplete[]): boolean{
        if(!checkData(userTemplete[0]))
            return true;
        return false;
    }





}
