import { Injectable } from "@nestjs/common";
import { ChallengeDay } from "../domain/entity/ChallengeDay";
import { Challenge } from "../domain/entity/Challenge";
import { checkData } from "../util/checker";
import { ChallengeStatus } from "../dto/response/ChallengeStatus";
import { ChallengeAndOrganization } from "../dto/values/ChallengeAndOrganization";
import { ChallengeAccordingToOrganization } from "../dto/response/ChallengeAccordingToOrganization";
import { ChallengeHelper } from "../helper/Challenge.Helper";
import { ChallengeDayHelper } from "../helper/ChallengeDay.Helper.js";
import { ChallengeVerifyService } from "../domain/service/ChallengeVerify.Service";
import { UserApi } from "../intrastructure/User.Api";
import { DataMapperService } from "../domain/service/DataMapper.Service";
import { Organization } from "src/domain/user/domain/entity/Organization";




@Injectable()
export class ChallengeInformationService{

    constructor(
        private readonly challengeHelper: ChallengeHelper,
        private readonly challengeDayHelper: ChallengeDayHelper,
        private readonly challengeVerifyService: ChallengeVerifyService,
        private readonly userApi:UserApi,
        private readonly dataMapperService:DataMapperService
    ){}


    public async checkChallengeDay(challengeId: number, date: Date){ 
        const challengeDayData = await this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(challengeId, date, false);
        this.challengeVerifyService.verifyChallengeDay(challengeDayData)
    }

    public async bringChallengeStatus(challengeId: number): Promise<ChallengeStatus> { 
        const challengeData : Challenge[] = await this.challengeHelper.giveChallengeByIdAndOngoing(challengeId, false);
        const challengeStatus : boolean = this.verifyChallengeStatus(challengeData);
        return ChallengeStatus.of(challengeStatus);
       
    }

    public async bringChallengeAccordingToOrganization(){ 
        const organizationDatas = await this.userApi.requestAllOrganization();
        const extractedOrganizationIds = this.dataMapperService.extractOrganizationIds(organizationDatas);
        const challengeDatas = await this.challengeHelper.giveChallengeByOrgnizationIds(extractedOrganizationIds);
        const mappedChallengeAndOrganization = this.mappingChallengeAndOrganization(organizationDatas, challengeDatas);
        const sortedallChallengeAccordingToOrganizationData = this.sortChallengePerOrganization(mappedChallengeAndOrganization);
        return ChallengeAccordingToOrganization.of(sortedallChallengeAccordingToOrganizationData); 
    }

    public async bringChallengeDay(challengeId:number):Promise<Date[]>{ 
       const challengeDay = await this.challengeDayHelper.giveChallengeDayByChallengeId(challengeId, false);
       const challengeDays = this.sortChallnegeDay(challengeDay);
       return challengeDays;
    }


    private sortChallnegeDay(challengeDay:ChallengeDay[]){
        return challengeDay.map((data)=> data.getDay())
    }


    private verifyChallengeStatus(challengeData: Challenge[]): boolean{
        if(!checkData(challengeData[0]))  // 데이터가 없을 떄
            return true;
        return false;
    }

    public mappingChallengeAndOrganization(organizations: Organization[], challenges: Challenge[]): ChallengeAndOrganization[] {
        return organizations.flatMap((organization) => {
            const relatedChallenges = challenges
              .filter(challenge => challenge.getOrganizationId() === organization.getId())
            return relatedChallenges.map((data)=>{
                return new ChallengeAndOrganization(organization.getName(), data.getName());
            })
        });
      }

    private sortChallengePerOrganization(array : ChallengeAndOrganization[]):ChallengeAccordingToOrganization[]{
        const groupOrganization : {
            [organization: string]: string[];
        } = {};
        array.forEach(item => {
        if (!groupOrganization[item.getOrganization()]) {
            groupOrganization[item.getOrganization()] = [];
        }
        groupOrganization[item.getOrganization()].push(item.getChallenge());
        });
        const sortData : ChallengeAccordingToOrganization[] = Object.entries(groupOrganization).map(([organization, challenges]) => {   
            return new ChallengeAccordingToOrganization(organization, challenges);
        });
        return sortData
    }

}