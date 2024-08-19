import { Injectable } from "@nestjs/common";
import { ChallengeDay } from "../domain/entity/ChallengeDay";
import { ChallengeException } from "../exception/ChallengeException";
import { ChallengeErrorCode } from "../exception/ChallengeErrorCode";
import { Challenge } from "../domain/entity/Challenge";
import { checkData } from "../util/checker";
import { ChallengeStatus } from "../dto/response/ChallengeStatus";
import { ChallengeAndOrganization } from "../dto/values/ChallengeAndOrganization";
import { ChallengeAccordingToOrganization } from "../dto/response/ChallengeAccordingToOrganization";
import { ChallengeHelper } from "../helper/Challenge.Helper";
import { ChallengeDayHelper } from "../helper/ChallengeDay.Helper";




@Injectable()
export class ChallengeInformationService{

    constructor(
        private readonly challengeHelper: ChallengeHelper,
        private readonly challengeDayHelper: ChallengeDayHelper
    ){}


    public async checkChallengeDay(challengeId: number, date: Date){ 
        const challengeDayData = await this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(challengeId, date);
        this.verifyChallengeDay(challengeDayData)
    }

    public async bringChallengeStatus(challengeId: number): Promise<ChallengeStatus> { 
        const challengeData : Challenge[] = await this.challengeHelper.giveChallengeByIdAndOngoing(challengeId);
        const challengeStatus : boolean = this.verifyChallengeStatus(challengeData);
        return ChallengeStatus.of(challengeStatus);
       
    }

    public async bringChallengeAccordingToOrganization(): Promise<ChallengeAccordingToOrganization[]> { 
        const allChallengeAccordingToOrganizationData = await this.challengeHelper.giveAllChallengeAccordingToOrganization();
        const sortedallChallengeAccordingToOrganizationData = this.sortChallengePerOrganization(allChallengeAccordingToOrganizationData);
        return ChallengeAccordingToOrganization.of(sortedallChallengeAccordingToOrganizationData); 
    }

    public async bringChallengeDay(challengeId:number):Promise<Date[]>{ 
       const challengeDay = await this.challengeDayHelper.giveChallengeDayByChallengeId(challengeId);
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


    private verifyChallengeDay(challengeDay : ChallengeDay){
        if(!checkData(challengeDay))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE_DAY);
        
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