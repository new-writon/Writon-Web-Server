import { Injectable } from '@nestjs/common';
import { UserTemplate } from '../../template/domain/entity/UserTemplate';
import { Affiliation } from '../domain/entity/Affiliation';
import { checkData } from '../../auth/util/checker';
import { TemplateStatus } from '../dto/response/TemplateStatus';
import { UserChallengeSituation } from '../dto/response/UserChallengeSituation';
import { sortCallendarDateBadge } from '../util/badge'
import { CalendarData } from '../dto/response/CalendarData';
import { ChallengeApi } from '../infrastruture/Challenge.Api';
import { ChallengeInformation } from '../../challenge/dto/values/ChallengeInformation';
import { TemplateApi } from '../infrastruture/Template.Api';
import { ChallengesPerOrganization } from '../dto/values/ChallengesPerOrganization';
import { ParticipationInChallengePerAffiliation } from '../dto/response/ParticipationInChallengePerAffiliation';
import { UserChallenge } from '../domain/entity/UserChallenge';
import { AffiliationHelper } from '../helper/Affiliation.Helper';
import { UserHelper } from '../helper/User.Helper';
import { UserChallengeHelper } from '../helper/UserChallenge.Helper';
import { UserChallengeCheckCount } from '../dto/response/UserChallengeCheckCount';
import { UserVerifyService } from '../domain/service/UserVerify.Service';
import { ChallengeDeposit } from '../dto/values/ChallengeDeposit';
import { DataMapperService } from '../domain/service/DataMapper.Service';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';


@Injectable()
export class UserChallengeService {
    constructor(
        private readonly affiliationHelper: AffiliationHelper,
        private readonly userHelper: UserHelper,
        private readonly templateApi: TemplateApi,
        private readonly userChallengeHelper: UserChallengeHelper,
        private readonly challengeApi: ChallengeApi,
        private readonly userVerifyService: UserVerifyService,
        private readonly dataMapperService:DataMapperService
    ) {}

    public async signTemplateStatus(userId: number, organization: string, challengeId: number): Promise<TemplateStatus>{
        const affiliationData:Affiliation = await this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization, false);
        const userChallengeData:UserChallenge = await this.userChallengeHelper.giveUserChallengeByAffiliationIdAndChallengeId(affiliationData.getAffiliationId(), challengeId, true)
        const userTemplateData : UserTemplate[] = await this.templateApi.requestUserTemplateByAffiliationAndChallengeId(userChallengeData.getId(), false);
        const todayTemplateStatus : boolean = this.verifyTodayTemplateStatus(userTemplateData);
        return TemplateStatus.of(todayTemplateStatus);
    }

    public async bringUserChallengeSituation(userId: number, organization: string, challengeId: number): Promise<UserChallengeSituation>{
        const affiliationData: Affiliation = await this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization,false);
        const userChallengeData: UserChallenge = await this.userChallengeHelper.giveUserChallengeByAffiliationIdAndChallengeId(affiliationData.getAffiliationId(), challengeId,true)
        const [userData, overlapPeriod, challengeOverlapCount, challengeSuccessCount, challengeData] = await Promise.all([
          this.userHelper.giveUserById(userId,false),    
          this.challengeApi.requestOverlapPeriod(challengeId),
          this.challengeApi.requestChallengeOverlapCount(challengeId),
          this.templateApi.requestChallengeSuccessChallengeCount(userChallengeData.getId()),
          this.challengeApi.requestChallengeById(challengeId, true)  
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
            userChallengeData.getUserDeposit(),
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
           // 검증 x
            this.challengeApi.requestChallengeWithCondition(challengeId),
            this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization, false),
            this.challengeApi.requestChallengeById(challengeId, true)
        ]);
        if(checkData(challengeAllData))
            return this.userChallengeHelper.executeInsertUserChallenge(userAffiliation.getAffiliationId(), challengeData.getId(),challengeData.getDeposit(), 0); // 미리 챌린지에 참여 시
        const caculateDepositResult = await this.makeChallengeUserDeposit(challengeAllData);
        await this.userChallengeHelper.executeInsertUserChallenge(userAffiliation.getAffiliationId(), challengeData.getId(), caculateDepositResult, 0);
    }

    public async initializeDeposit(): Promise<void>{
       // 검증 x
        const challengeData = await this.challengeApi.requestAllChallengingInformation();
        const sortedChallengeData = this.sortChallengeDataByChallengeId(challengeData);
        for (const challengeId in sortedChallengeData) {
           // 검증 x
            const userChallenges = await this.userChallengeHelper.giveUserChallengeByChallengeId(Number(challengeId));
            const extractedUserChallengeIds = this.dataMapperService.extractUserChallengeIds(userChallenges);
             // 검증 x
            const userChallengeSuccessData = await this.templateApi.requestUserTemplateSuccessCountByUserChallengeIds(extractedUserChallengeIds);
            const userDepositInformation = this.calculateAllUserDeposits(sortedChallengeData, userChallengeSuccessData, Number(challengeId));
            await this.userChallengeHelper.executeUpdateUserChallengeDeposit(userDepositInformation);
        }  
    }

    private calculateAllUserDeposits (
        sortedChallengeData: ChallengeAllInformationCustom,
        userChallengeSuccessData: { count: number, userChallengeId: number }[],
        challengeId: number
      ){
        return userChallengeSuccessData.map(({ count, userChallengeId }) => {
           const mappedData = this.calculateUserDeposit(sortedChallengeData, count, userChallengeId, challengeId)
           return ChallengeDeposit.of(mappedData.userChallengeId, mappedData.calculatedDeposit);
        });
      }
      
    private calculateUserDeposit(
        sortedChallengeData: ChallengeAllInformationCustom,
        successCount: number,
        userChallengeId: number,
        challengeId: number
      ){
        const failCount = sortedChallengeData[challengeId].challengeDayCount - successCount;
        const deduction = this.findDeduction(sortedChallengeData[challengeId].deductions, failCount);
        return {
          userChallengeId: userChallengeId,
          calculatedDeposit: Math.floor(sortedChallengeData[challengeId].deposit - (deduction?.deduction_amount || 0))
        };
    }

    private findDeduction(
        deductions: { start_count: number, end_count: number, deduction_amount: number }[],
        failCount: number
    ){
        return deductions.find(({ start_count, end_count }) => failCount >= start_count && failCount <= end_count);
    }
      
    private sortChallengeDataByChallengeId(
        challengeData: ChallengeAllInformation[]
      ){
        return challengeData.reduce((acc, item) => {
          if (!acc[item.getChallengeId()]) {
            acc[item.getChallengeId()] = {
                challengeId: item.getChallengeId(),         
                deposit: item.getDeposit(),                 
                challengeDayCount: item.getChallengeDayCount(),
                deductions: []
            };
          }
          acc[item.getChallengeId()].deductions.push({
            start_count: item.getStartCount(),
            end_count: item.getEndCount(),
            deduction_amount: item.getDeductionAmount()
          });
          return acc;
        }, {} as ChallengeAllInformationCustom);
      }



    public async bringCalendarData(userId: number, organization: string, challengeId: number): Promise<CalendarData >{
        const [affiliationData, challengeDayData] = await Promise.all([
            this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization,false),
            this.challengeApi.requestChallengeDayByChallengeId(challengeId,false) 
        ]);
        const userChallengeData:UserChallenge = await this.userChallengeHelper.giveUserChallengeByAffiliationIdAndChallengeId(affiliationData.getAffiliationId(), challengeId, true)
        const userTemplateData = await this.templateApi.requestUserTemplateByAffiliationAndChallengeId(userChallengeData.getId(), false);
        const calendarData :CalendarData[] = sortCallendarDateBadge(challengeDayData, userTemplateData);
        return CalendarData.of(calendarData);                           
    };

    public async bringChallengesPerOrganization(userId:number):Promise<ChallengesPerOrganization[]>{
      const challengesPerOrganization:ChallengesPerOrganization[] = await this.affiliationHelper.giveChallengesPerOrganizationByUserId(userId);
      const extractedChallengeIds = this.dataMapperService.extractChallengeIds(challengesPerOrganization);
      const challengeDatas = await this.challengeApi.requestChallengesByIds(extractedChallengeIds);
      const mappedChallengesPerOrganization = this.mappingChallengesPerOrganization(challengesPerOrganization, challengeDatas);
      return mappedChallengesPerOrganization;
    }

    public mappingChallengesPerOrganization(challengesPerOrganization:ChallengesPerOrganization[], challengeDatas:ChallengesPerOrganization[]){
      return challengesPerOrganization.map((cpo)=> {
        const challenge = challengeDatas.find((challenge)=> challenge.getChallengeId() === cpo.getChallengeId());
        return ChallengesPerOrganization.of(cpo.getOrganization(), cpo.getChallengeId(), challenge.getChallenge(), challenge.getChallengeFinishSign());
      })
    }

    public async bringParticipationInChallengePerAffiliation(userId:number,organization:string,challengeId:number):Promise<ParticipationInChallengePerAffiliation>{
        let [affiliationData, userChallengeData] = await Promise.all([
            this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization, true), 
            this.userChallengeHelper.giveUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId,true)
        ]);
        const affiliatedConfirmation = this.checkAffiliation(affiliationData)
        const challengedConfirmation = this.checkUserChallenge(userChallengeData) 
        return ParticipationInChallengePerAffiliation.of(affiliatedConfirmation, challengedConfirmation);   
    }

    public async bringUserChallengeCheckCount(userId:number,organization:string,challengeId:number):Promise<UserChallengeCheckCount>{
        const userChallengeData : UserChallenge = await this.userChallengeHelper.giveUserChallengeWithUserIdAndOragnizationByChallengeId(userId,organization,challengeId,true);
        return UserChallengeCheckCount.of(userChallengeData.getCheckCount())
    }

    public async modifyUserChallengeCheckCount(userId:number,organization:string,challengeId:number, checkCount:number):Promise<void>{
        const userChallengeData : UserChallenge = await this.userChallengeHelper.giveUserChallengeWithUserIdAndOragnizationByChallengeId(userId,organization,challengeId,true);
        this.userVerifyService.verifyUserChallenge(userChallengeData);
        await this.userChallengeHelper.executeUpdateUserChallengeCheckCount(userChallengeData.getId(), checkCount);
    }

    private verifyTodayTemplateStatus(userTemplete: UserTemplate[]): boolean{
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

