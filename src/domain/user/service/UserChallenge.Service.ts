import { Inject, Injectable } from '@nestjs/common';
import { AffiliationRepository } from '../domain/repository/Affiliation.Repository.js';
import { UserTemplete } from '../../../domain/template/domain/entity/UserTemplete.js';
import { Affiliation } from '../domain/entity/Affiliation.js';
import { checkData } from '../../auth/util/checker.js';
import { TemplateStatus } from '../dto/response/TemplateStatus.js';
import { UserChallengeSituation } from '../dto/response/UserChallengeSituation.js';
import { UserRepository } from '../domain/repository/User.Repository.js';
import { UserChallengeRepository } from '../domain/repository/UserChallenge.Repository.js';
import { sortCallendarDateBadge } from '../util/badge.js'
import { CalendarData } from '../dto/response/CalendarData.js';
import { ChallengeApi } from '../infrastruture/Challenge.Api.js';
import { ChallengeInformation } from '../../challenge/dto/ChallengeInformation.js';
import { TemplateApi } from '../infrastruture/Template.Api.js';
import { ChallengesPerOrganization } from '../dto/ChallengesPerOrganization.js';
import { ParticipationInChallengePerAffiliation } from '../dto/response/ParticipationInChallengePerAffiliation.js';
import { UserChallenge } from '../domain/entity/UserChallenge.js';
import { AffiliationHelper } from '../helper/Affiliation.Helper.js';
import { UserHelper } from '../helper/User.Helper.js';
import { UserChallengeHelper } from '../helper/UserChallenge.Helper.js';


@Injectable()
export class UserChallengeService {
    constructor(
        // @Inject('affiliationImpl')
        // private readonly affiliationRepository: AffiliationRepository,
        // @Inject('userImpl')
        // private readonly userRepository: UserRepository,
        private readonly affiliationHelper: AffiliationHelper,
        private readonly userHelper: UserHelper,
        private readonly templateApi: TemplateApi,
        // @Inject('userchallengeImpl')
        // private readonly userChallengeRepository: UserChallengeRepository,
        private readonly userChallengeHelper: UserChallengeHelper,
        private readonly challengeApi: ChallengeApi

      
    ) {}

    public async signTodayTemplateStatus(userId: number, organization: string, challengeId: number): Promise<TemplateStatus>{

        const affiliationData: Affiliation = await this.affiliationHelper.giveAffiliationByUserIdAndOrganization(userId, organization);
        const userTemplateData : UserTemplete[] = await this.templateApi.requestUserTemplateByAffiliationAndChallengeId(affiliationData.getAffiliationId(), challengeId );
        const todayTemplateStatus : boolean = this.verifyTodayTemplateStatus(userTemplateData);
        return TemplateStatus.of(todayTemplateStatus);
    }

    public async presentSituation(userId: number, organization: string, challengeId: number): Promise<UserChallengeSituation>{
      
        const affiliationData: Affiliation = await this.affiliationHelper.giveAffiliationByUserIdAndOrganization(userId, organization);
        const [userData, overlapPeriod, challengeOverlapCount, challengeSuccessCount, overlapDeposit, challengeData] = await Promise.all([
            this.userHelper.giveUserById(userId),    
            this.challengeApi.requestOverlapPeriod(challengeId),
            this.challengeApi.requestOverlapCount(challengeId),
            this.templateApi.requestSuccessChallengeCount(affiliationData.getAffiliationId(), challengeId),
            this.userChallengeHelper.giveUserChallengeByAffiliationIdAndId(affiliationData.getAffiliationId(), challengeId),
            this.challengeApi.requestChallengeById(challengeId)  
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

    /**
     * 
     * @param userId 유저 id
     * @param organization 조직이름
     * @param challengeId 챌린지 id
     */
    public async startChallenge(userId:number, organization:string, challengeId: number): Promise<void>{
        
        const [challengeAllData, userAffiliation, challengeData] = await Promise.all([
            this.challengeApi.requestChallengeWithCondition(challengeId),
            this.affiliationHelper.giveAffiliationByUserIdAndOrganization(userId, organization),
            this.challengeApi.requestChallengeById(challengeId)
        ]);
        if(checkData(challengeAllData))
            return this.userChallengeHelper.executeInsertUserChallenge(userAffiliation.getAffiliationId(), challengeData.getId(),challengeData.getDeposit(), 0); // 미리 챌린지에 참여 시
        const caculateDepositResult = await this.makeChallengeUserDeposit(challengeAllData);
        await this.userChallengeHelper.executeInsertUserChallenge(userAffiliation.getAffiliationId(), challengeData.getId(), caculateDepositResult, 0);
    }


   public async bringCalendarData(userId: number, organization: string, challengeId: number): Promise<CalendarData >{
      
        const [affiliationData, challengeDayData] = await Promise.all([
            this.affiliationHelper.giveAffiliationByUserIdAndOrganization(userId, organization),
            this.challengeApi.requestChallengeDayByChallengeId(challengeId) 
        ]);
        const userTemplateData = await this.templateApi.requestUserTemplateByAffiliationAndChallengeId(affiliationData.getAffiliationId(), challengeId);
        const calendarData :CalendarData[] = sortCallendarDateBadge(challengeDayData, userTemplateData);
        return CalendarData.of(calendarData);
    };

    public async bringChallengesPerOrganization(userId:number):Promise<ChallengesPerOrganization[]>{
        const challengesPerOrganization:ChallengesPerOrganization[] = await this.affiliationHelper.giveChallengesPerOrganizationByUserId(userId);
        return ChallengesPerOrganization.of(challengesPerOrganization);
    }

    public async bringParticipationInChallengePerAffiliation(userId:number,organization:string,challengeId:number):Promise<ParticipationInChallengePerAffiliation>{
        let [affiliationData, userChallengeData] = await Promise.all([
            this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization), 
            this.userChallengeHelper.giveUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId)
        ]);
        const affiliatedConfirmation = this.checkAffiliation(affiliationData)
        const challengedConfirmation = this.checkUserChallenge(userChallengeData) 
        return ParticipationInChallengePerAffiliation.of(affiliatedConfirmation, challengedConfirmation);   
    }

    private verifyTodayTemplateStatus(userTemplete: UserTemplete[]): boolean{
        if(!checkData(userTemplete[0]))
            return true;
        return false;
    }

    private async makeChallengeUserDeposit(challengeData: ChallengeInformation[]){

        const sortedChallengeData = this.sortChallengeData(challengeData);
        const challengeIdKeys = Object.keys(sortedChallengeData); 
        for (const challengeIdKey of challengeIdKeys) {
            return this.calculateStartUserChallengeDeposit(sortedChallengeData,0,Number(challengeIdKey));} 
    }

    private sortChallengeData(challengeData: ChallengeInformation[]) { 
        const sortedChallengeData = challengeData.reduce((acc, item) => {
          const { challengeId, deposit, challengeDayCount } = item;
          if (!acc[challengeId]) {
            acc[challengeId] = {
              challengeId,
              deposit,
              challengeDayCount,
              deductions: []
            };}
          acc[challengeId].deductions.push({
            start_count: item.startCount,
            end_count: item.endCount,
            deduction_amount: item.deductionAmount
          });
          return acc;
        }, {} as ChallengeAllInformationCustom);
        return sortedChallengeData   
    }

    private calculateStartUserChallengeDeposit(sortedChallengeData: ChallengeAllInformationCustom, successCount: number, key: number) {
        const failCount = Number(sortedChallengeData[key].challengeDayCount) - successCount;
        const targetDeduction = sortedChallengeData[key].deductions.find(({ start_count, end_count }) => failCount >= start_count && failCount <= end_count);   
        if (targetDeduction) {
          const { deduction_amount } = targetDeduction;
          return  Math.floor(sortedChallengeData[key].deposit - deduction_amount)
        } else {
          return Math.floor(sortedChallengeData[key].deposit)
        }
    }

    private checkAffiliation(affiliationData:Affiliation): boolean | null{
        let affiliatedConfirmation = true;
        if (!checkData(affiliationData)){ // 데이터가 없을 경우
            affiliatedConfirmation = false;}
        return affiliatedConfirmation;
    }

    private checkUserChallenge(userChallengeData: UserChallenge): boolean | null{
        let challengedConfirmation=true;
        if (!checkData(userChallengeData)) {
            challengedConfirmation = false;} 
        return challengedConfirmation;
    }
}
