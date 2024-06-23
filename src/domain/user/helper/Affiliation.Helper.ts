import { Inject, Injectable } from "@nestjs/common";
import { AffiliationRepository } from "../domain/repository/Affiliation.Repository.js";
import { Affiliation } from "../domain/entity/Affiliation.js";
import { ChallengesPerOrganization } from "../dto/ChallengesPerOrganization.js";
import { UserProfile } from "../dto/response/UserProfile.js";
import { UserVerifyService } from "../domain/service/UserVerify.Service.js";
import { Participant } from "../dto/response/Participant.js";

@Injectable()
export class AffiliationHelper {

    constructor(
        @Inject('affiliationImpl')
        private readonly affiliationRepository: AffiliationRepository,
        private readonly userVerifyService: UserVerifyService
    ){}

    public async giveAffiliationByUserIdAndOrganization(userId: number, organization: string): Promise<Affiliation>{
        const affiliationData =  await this.affiliationRepository.findAffiliationByUserIdAndOrganization(userId, organization);
       // this.userVerifyService.verifyAffiliation(affiliationData);
        return affiliationData;
    }

    public async giveAffiliationByNicknameAndOrganization(nickname:string, organization: string): Promise<Affiliation>{
        return this.affiliationRepository.findAffiliationByNicknameAndOrganization(nickname, organization);
    }

    public async insertAffiliation(userId:number, organizationId:number, nickname: string, job: string,
        jobIntroduce: string, hireDate: string, company: string,companyPublic: boolean):Promise<void>{
            return this.affiliationRepository.insertAffiliation(userId, organizationId, nickname, job,
                jobIntroduce, hireDate, company, companyPublic
            );
    }

    public async giveChallengesPerOrganizationByUserId(userId:number):Promise<ChallengesPerOrganization[]>{
        return this.affiliationRepository.findChallengesPerOrganizationByUserId(userId);
    }

    public async giveAffiliationByUserIdWithOrganization(userId:number, organization:string):Promise<Affiliation>{
        const affiliationData = await this.affiliationRepository.findAffiliationByUserIdWithOrganization(userId, organization);
        this.userVerifyService.verifyAffiliation(affiliationData);
        return affiliationData;
    }

    public async giveUserProfileByUserIdAndOrganization(userId:number, organization:string):Promise<UserProfile>{
        return this.affiliationRepository.findUserProfileByUserIdAndOrganization(userId, organization);
    }

    public async executeUpdateUserProfileByUserIdAndOrganization(userId:number,organization:string,nickname:string, company:string,
        hireDate:Date, job:string, jobIntroduce:string, companyPublic:boolean):Promise<void>{
            await this.affiliationRepository.updateUserProfileByUserIdAndOrganization(userId,organization,nickname,company,hireDate,job,jobIntroduce,companyPublic);
        }

    public async giveAffilaitonWithChallengeIdArray(userChallengeId:number[]):Promise<Affiliation[]>{
        return this.affiliationRepository.findAffilaitonWithChallengeIdArray(userChallengeId)
    }

    public async giveAffilaitonWithChallengeIdAndUserChallengeId(challengeId:number, userChallengeId:number[]):Promise<Affiliation[]>{
        return this.affiliationRepository.findAffilaitonWithChallengeIdAndUserChallengeId(challengeId, userChallengeId)
    }

    public async giveAffiliationById(affiliationId: number[]):Promise<Affiliation[]>{
        return this.affiliationRepository.findAffiliationById(affiliationId);
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

    public async giveAffiliationAndUserByUserIdAndOrganization(userId: number, organization: string):Promise<Affiliation>{
        return this.affiliationRepository.findAffiliationAndUserByUserIdAndOrganization(userId, organization);
    }
    
}