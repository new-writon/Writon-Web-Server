import { Inject, Injectable } from "@nestjs/common";
import { AffiliationRepository } from "../domain/repository/Affiliation.Repository";
import { Affiliation } from "../domain/entity/Affiliation";
import { ChallengesPerOrganization } from "../dto/values/ChallengesPerOrganization";
import { UserProfile } from "../dto/response/UserProfile";
import { UserVerifyService } from "../domain/service/UserVerify.Service";
import { Participant } from "../dto/response/Participant";

@Injectable()
export class AffiliationHelper {

    constructor(
        @Inject('affiliationImpl')
        private readonly affiliationRepository: AffiliationRepository,
        private readonly userVerifyService: UserVerifyService
    ){}

    public async giveAffiliationByUserIdWithOrganization(userId: number, organization: string, verifyFlag:boolean): Promise<Affiliation>{
        const data = await this.affiliationRepository.findAffiliationByUserIdAndOrganization(userId, organization);
        if(verifyFlag) this.userVerifyService.verifyAffiliation(data);
        return data;
    }

    public async giveAffiliationByNicknameAndOrganization(nickname:string, organization: string, verifyFlag:boolean): Promise<Affiliation>{
        const data = await this.affiliationRepository.findAffiliationByNicknameAndOrganization(nickname, organization);
        if(verifyFlag) this.userVerifyService.verifyAffiliation(data);
        return data;
    }

    public async insertAffiliation(userId:number, organizationId:number, nickname: string, position: string,
        positionIntroduce: string, hireDate: string, company: string,companyPublic: boolean):Promise<void>{
            return this.affiliationRepository.insertAffiliation(userId, organizationId, nickname, position,
                positionIntroduce, hireDate, company, companyPublic
            );
    }

    public async giveChallengesPerOrganizationByUserId(userId:number):Promise<ChallengesPerOrganization[]>{
        return this.affiliationRepository.findChallengesPerOrganizationByUserId(userId);
    }


    public async giveUserProfileByUserIdAndOrganization(userId:number, organization:string):Promise<UserProfile>{
        return this.affiliationRepository.findUserProfileByUserIdAndOrganization(userId, organization);
    }

    public async executeUpdateUserProfileByUserIdAndOrganization(userId:number,organization:string,nickname:string, company:string,
        hireDate:Date,position:string, positionIntroduce:string, companyPublic:boolean):Promise<void>{
            await this.affiliationRepository.updateUserProfileByUserIdAndOrganization(userId,organization,nickname,company,hireDate,position, positionIntroduce,companyPublic);
        }

    public async giveAffilaitonWithChallengeIdArray(userChallengeId:number[], verifyFlag:boolean):Promise<Affiliation[]>{
        const datas = await this.affiliationRepository.findAffilaitonWithChallengeIdArray(userChallengeId);
        if(verifyFlag) this.userVerifyService.verifyAffiliations(datas);
        return datas;
    }

    public async giveAffilaitonWithChallengeIdAndUserChallengeId(challengeId:number, userChallengeId:number[], verifyFlag:boolean):Promise<Affiliation[]>{
        const datas = await this.affiliationRepository.findAffilaitonWithChallengeIdAndUserChallengeId(challengeId, userChallengeId);
        if(verifyFlag) this.userVerifyService.verifyAffiliations(datas);
        return datas;
    }

    public async giveAffiliationById(affiliationId: number[], verifyFlag:boolean):Promise<Affiliation[]>{
        const datas = await this.affiliationRepository.findAffiliationById(affiliationId);
        if(verifyFlag) this.userVerifyService.verifyAffiliations(datas);
        return datas;
    }

    
    public async giveAffiliationAndUserById(affiliationId: number[]):Promise<Affiliation[]>{
        return this.affiliationRepository.findAffiliationAndUserById(affiliationId);
    }

    public async giveAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(userId:number, challengeId:number):Promise<Participant>{
        return this.affiliationRepository.findAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(userId, challengeId);
    }

    public async giveAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(userId:number, challengeId:number):Promise<Participant[]>{
        return this.affiliationRepository.findAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(userId, challengeId);
    }

    public async giveAffiliationAndUserByUserIdAndOrganization(userId: number, organization: string, verifyFlag:boolean):Promise<Affiliation>{
        const data = await this.affiliationRepository.findAffiliationAndUserByUserIdAndOrganization(userId, organization);
        if(verifyFlag) this.userVerifyService.verifyAffiliation(data);
        return data;
    }
    
}