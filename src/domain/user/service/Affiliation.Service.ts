import { Inject, Injectable } from "@nestjs/common";
import { Organization } from "../domain/entity/Organization.js";
import { UserProfile } from "../dto/response/UserProfile.js";
import { OrganizationHelper } from "../helper/Organization.Helper.js";
import { AffiliationHelper } from "../helper/Affiliation.Helper.js";
import { isSameDate } from "../util/checker.js";
import { Participant } from "../dto/response/Participant.js";
import { UserChallengeHelper } from "../helper/UserChallenge.Helper.js";
import { ChallengeApi } from "../infrastruture/Challenge.Api.js";
import { ParticipantComponent } from "../dto/response/ParticipantComponent.js";

@Injectable()
export class AffiliationService{

    constructor(
        private readonly organizationHelper: OrganizationHelper,
        private readonly affiliationHelper: AffiliationHelper,
        private readonly userChallengeHelper: UserChallengeHelper,
        private readonly challengeApi: ChallengeApi
    ){}

    public async enterAffiliation(userId:number, organization:string,     
        nickname: string,
        job: string,
        jobIntroduce: string,
        hireDate: string,
        company: string,
        companyPublic: boolean): Promise<void>{
        const organizationData: Organization = await this.organizationHelper.giveOrganizationByName(organization);
        await this.affiliationHelper.insertAffiliation(userId, organizationData.getId(), nickname, job, jobIntroduce, hireDate, company, companyPublic)
    }


    public async bringUserProfileAccordingToOrganization(userId:number, organization:string):Promise<UserProfile>{
        const userProfileData:UserProfile = await this.affiliationHelper.giveUserProfileByUserIdAndOrganization(userId, organization);
        return UserProfile.of(userProfileData);
    }


    public async updateUserProfileAccordingToOrganization(
        userId:number,
        organization:string,
        nickname:string,
        company:string,
        hireDate:Date,
        job:string,
        jobIntroduce:string,
        companyPublic:boolean
    ){
        
        await this.affiliationHelper.executeUpdateUserProfileByUserIdAndOrganization(userId,organization,nickname,company,hireDate,job,jobIntroduce,companyPublic);
    }

    public async bringMyInformation(userId:number, challengeId:number): Promise<Participant>{
        const myInformationData = await this.affiliationHelper.giveAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(userId, challengeId);
        const sortedMyInformationData = this.sortCheeringAndPublic(new Array(myInformationData))
        return sortedMyInformationData[0]; 
    }

    public async bringParticipantInformation(userId:number, challengeId:number): Promise<ParticipantComponent>{
        const [participantData, participantCount, challengePeriod] = await Promise.all([
            this.affiliationHelper.giveAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(userId, challengeId),
            this.userChallengeHelper.giveUserChallengePaticipantCount(challengeId),
            this.challengeApi.requestOverlapPeriod(challengeId)
        ]);
        return ParticipantComponent.of(challengePeriod, participantCount, participantData);
    }


    private sortCheeringAndPublic(data: Participant[]): Participant[]{
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return data.map((user) => {
            if (!user.getCheeringPhraseDate() || !isSameDate(new Date(user.getCheeringPhraseDate()), currentDate)) {
                user.changeCheeringPhrase(null)
            } 
            if (user.getCompanyPublic() === 0) {
                user.changeCompany(null)
            }
            return user;
        });
    }

}