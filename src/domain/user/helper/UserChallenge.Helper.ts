import { Inject, Injectable } from "@nestjs/common";
import { UserChallenge } from "../domain/entity/UserChallenge";
import { UserChallengeRepository } from "../domain/repository/UserChallenge.Repository";
import { UserVerifyService } from "../../../global/exception/user/UserVerify.Service";
import { ChallengeDeposit } from "../dto/values/ChallengeDeposit";

@Injectable()
export class UserChallengeHelper{

    constructor(
        @Inject('userchallengeImpl')
        private readonly userChallengeRepository: UserChallengeRepository,
        private readonly userVerifyService: UserVerifyService

    ){}

    public async giveUserChallengeByUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId: number){
        return this.userChallengeRepository.findUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId);
    }

    public async giveUserChallengeByAffiliationIdAndChallengeId(affiliationId: number, challengeId: number):Promise<UserChallenge>{
       return this.userChallengeRepository.findUserChallengeByAffiliationIdAndChallengeId(affiliationId,challengeId);
    }

    public async executeInsertUserChallenge(affiliationId:number, challengeId: number, deposit:number, review: number): Promise<void>{
        return this.userChallengeRepository.insertUserChallenge(affiliationId,challengeId, deposit, review);
    }

    public async giveUserChallengeWithUserIdAndOragnizationByChallengeId(userId:number, organization:string, challengeId:number):Promise<UserChallenge>{
        return this.userChallengeRepository.findUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
    }

    public async giveUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId:number[], challengeId:number):Promise<UserChallenge[]>{
        return this.userChallengeRepository.findUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId, challengeId);
    }

    public async executeUpdateUserChallengeCheckCount(userChallengeId:number, checkCount:number):Promise<void>{
        await this.userChallengeRepository.updateUserChallengeCheckCount(userChallengeId, checkCount);
    }

    public async giveUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId:number, userId:number, organization:string):Promise<UserChallenge>{
        return this.userChallengeRepository.findUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId, userId, organization);
    }

    public async executeUpdateUserChallengeReview(userId:number, organization:string, challengeId:number): Promise<void>{
        const userChallengeData = await this.userChallengeRepository.findUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        this.userVerifyService.verifyUserChallenge(userChallengeData);
        await this.userChallengeRepository.updateUserChallengeReview(userChallengeData.getId());
    }

    public async executeUpdateUserChallengeReEngagement(userId:number, organization:string, challengeId:number, check:boolean): Promise<void>{
        const userChallengeData = await this.userChallengeRepository.findUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        this.userVerifyService.verifyUserChallenge(userChallengeData);
        await this.userChallengeRepository.updateUserChallengeReEngagement(userChallengeData.getId(), check);
    }

    public async giveUserChallengeAndAffiliationAndUserByUserChallengeIdArrayAndChallengeId(userChallengeId:number[], challengeId:number):Promise<UserChallenge[]>{
      return this.userChallengeRepository.findUserChallengeAndAffiliationAndUserByUserChallengeIdAndChallengeId(userChallengeId, challengeId);
    }

    async giveUserChallengePaticipantCount(challengeId:number):Promise<number>{
        return this.userChallengeRepository.findUserChallengePaticipantCount(challengeId);
    }

    async executeInsertCheeringPhrase(affiliationId: number, challengeId: number, content: string):Promise<void>{
        const userChallengeData = await this.userChallengeRepository.findUserChallengeByAffiliationIdAndChallengeId(affiliationId, challengeId);
        this.userVerifyService.verifyUserChallenge(userChallengeData);
        return this.userChallengeRepository.insertCheeringPhrase(affiliationId, challengeId, content);
    }


    async giveUserChallengeAndAffiliationAndUserByChallengeId(challengeId:number):Promise<UserChallenge[]>{
        return this.userChallengeRepository.findUserChallengeAndAffiliationAndUserByChallengeId(challengeId);
    }

    async giveUserChallengeAndAffiliationAndUserById(userChallengeId:number):Promise<UserChallenge>{
        return this.userChallengeRepository.findUserChallengeAndAffiliationAndUserById(userChallengeId); 
    }

    async giveUserChallengeByChallengeId(challengeId: number){
        return this.userChallengeRepository.findUserChallengeByChallengeId(challengeId);
    }

    async executeUpdateUserChallengeDeposit(challengeDeposit:ChallengeDeposit[]):Promise<void>{
        return this.userChallengeRepository.updateUserChallengeDeposit(challengeDeposit);
    }





}