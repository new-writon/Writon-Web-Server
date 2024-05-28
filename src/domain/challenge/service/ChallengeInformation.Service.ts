import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository.js";
import { ChallengeDayRepository } from "../domain/repository/ChallengeDay.Repository.js";
import { ChallengeDay } from "../domain/entity/ChallengeDay.js";
import { ChallengeException } from "../exception/ChallengeException.js";
import { ChallengeErrorCode } from "../exception/ChallengeErrorCode.js";
import { Challenge } from "../domain/entity/Challenge.js";
import { checkData } from "../util/checker.js";
import { ChallengeStatus } from "../dto/response/ChallengeStatus.js";
import { ChallengeAndOrganization } from "../dto/ChallengeAndOrganization.js";
import { ChallengeAccordingToOrganization } from "../dto/response/ChallengeAccordingToOrganization.js";
import { ChallengeHelper } from "../helper/Challenge.Helper.js";
import { ChallengeDayHelper } from "../helper/ChallengeDay.Helper.js";




@Injectable()
export class ChallengeInformationService{

    constructor(
        // @Inject('challengeImpl')
        // private readonly challengeRepository: ChallengeRepository,
        // @Inject('challengedayImpl')
        // private readonly challengeDayRepository: ChallengeDayRepository,
        private readonly challengeHelper: ChallengeHelper,
        private readonly challengeDayHelper: ChallengeDayHelper
    ){}


    public async signChallengeDay(challengeId: number, date: Date){ 
        const challengeDayData = await this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(challengeId, date);
        this.verifyChallengeDay(challengeDayData)
    }

    public async signChallengeFinish(challengeId: number): Promise<ChallengeStatus> { 
        const challengeData : Challenge[] = await this.challengeHelper.giveChallengeByIdAndOngoing(challengeId);
        const challengeStatus : boolean = this.verifyChallengeStatus(challengeData);
        return ChallengeStatus.of(challengeStatus);
       
    }

    public async bringAllOragnizationAndAllChallenge(): Promise<ChallengeAccordingToOrganization[]> { 
        const allChallengeAccordingToOrganizationData = await this.challengeHelper.giveAllChallengeAccordingToOrganization();
        const sortedallChallengeAccordingToOrganizationData = this.sortChallengePerOrganization(allChallengeAccordingToOrganizationData);
        return ChallengeAccordingToOrganization.of(sortedallChallengeAccordingToOrganizationData);

       
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