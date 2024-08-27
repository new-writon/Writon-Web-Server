import { Inject, Injectable } from "@nestjs/common";
import { UserChallenge } from "../domain/entity/UserChallenge";
import { UserChallengeRepository } from "../domain/repository/UserChallenge.Repository";
import { UserVerifyService } from "../domain/service/UserVerify.Service";
import { ChallengeDeposit } from "../dto/values/ChallengeDeposit";

@Injectable()
export class UserChallengeHelper{

    constructor(
        @Inject('userchallengeImpl')
        private readonly userChallengeRepository: UserChallengeRepository,
        private readonly userVerifyService: UserVerifyService

    ){}

    public async giveUserChallengeByUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId: number, verifyFlag:boolean){
        const datas = await this.userChallengeRepository.findUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId);
        if(verifyFlag) this.userVerifyService.verifyUserChallenges(datas);
        return datas;
    }

    public async giveUserChallengeByAffiliationIdAndChallengeId(affiliationId: number, challengeId: number, verifyFlag:boolean):Promise<UserChallenge>{
        const data = await this.userChallengeRepository.findUserChallengeByAffiliationIdAndChallengeId(affiliationId,challengeId);
        if(verifyFlag)this.userVerifyService.verifyUserChallenge(data)
        return data;
    }

    public async executeInsertUserChallenge(affiliationId:number, challengeId: number, deposit:number, review: number): Promise<void>{
        return this.userChallengeRepository.insertUserChallenge(affiliationId,challengeId, deposit, review);
    }

    public async giveUserChallengeWithUserIdAndOragnizationByChallengeId(userId:number, organization:string, challengeId:number, verifyFlag:boolean):Promise<UserChallenge>{
        const data = await this.userChallengeRepository.findUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        if(verifyFlag) this.userVerifyService.verifyUserChallenge(data)
        return data
    }

    public async giveUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId:number[], challengeId:number, verifyFlag:boolean):Promise<UserChallenge[]>{
        const datas = await this.userChallengeRepository.findUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId, challengeId);
        if(verifyFlag) this.userVerifyService.verifyUserChallenges(datas);
        return datas;
    }

    public async executeUpdateUserChallengeCheckCount(userChallengeId:number, checkCount:number):Promise<void>{
        await this.userChallengeRepository.updateUserChallengeCheckCount(userChallengeId, checkCount);
    }

    public async giveUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId:number, userId:number, organization:string, verifyFlag:boolean):Promise<UserChallenge>{
        const data = await this.userChallengeRepository.findUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId, userId, organization);
        if(verifyFlag) this.userVerifyService.verifyUserChallenge(data)
        return data
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

    public async giveUserChallengeAndAffiliationAndUserByUserChallengeIdArrayAndChallengeId(userChallengeId:number[], challengeId:number, verifyFlag:boolean):Promise<UserChallenge[]>{
       const datas = await this.userChallengeRepository.findUserChallengeAndAffiliationAndUserByUserChallengeIdAndChallengeId(userChallengeId, challengeId);
       if(verifyFlag) this.userVerifyService.verifyUserChallenges(datas);
       return datas;
    }

    async giveUserChallengePaticipantCount(challengeId:number):Promise<number>{
        return this.userChallengeRepository.findUserChallengePaticipantCount(challengeId);
    }

    async executeInsertCheeringPhrase(affiliationId: number, challengeId: number, content: string):Promise<void>{
        const userChallengeData = await this.userChallengeRepository.findUserChallengeByAffiliationIdAndChallengeId(affiliationId, challengeId);
        this.userVerifyService.verifyUserChallenge(userChallengeData);
        return this.userChallengeRepository.insertCheeringPhrase(affiliationId, challengeId, content);
    }


    async giveUserChallengeAndAffiliationAndUserByChallengeId(challengeId:number, verifyFlag:boolean):Promise<UserChallenge[]>{
        const datas = await this.userChallengeRepository.findUserChallengeAndAffiliationAndUserByChallengeId(challengeId);
        if(verifyFlag) this.userVerifyService.verifyUserChallenges(datas);
        return datas;
    }

    async giveUserChallengeAndAffiliationAndUserById(userChallengeId:number, verifyFlag:boolean):Promise<UserChallenge>{
        const data = await this.userChallengeRepository.findUserChallengeAndAffiliationAndUserById(userChallengeId);
        if(verifyFlag) this.userVerifyService.verifyUserChallenge(data);
        return data;
    }

    async giveUserChallengeByChallengeId(challengeId: number){
        return this.userChallengeRepository.findUserChallengeByChallengeId(challengeId);
    }

    async executeUpdateUserChallengeDeposit(challengeDeposit:ChallengeDeposit[]):Promise<void>{
        return this.userChallengeRepository.updateUserChallengeDeposit(challengeDeposit);
    }





}