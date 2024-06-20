import { Inject, Injectable } from "@nestjs/common";
import { Organization } from "../domain/entity/Organization";
import { UserProfile } from "../dto/response/UserProfile.js";
import { OrganizationHelper } from "../helper/Organization.Helper.js";
import { AffiliationHelper } from "../helper/Affiliation.Helper.js";
import { isSameDate } from "../util/checker.js";
import { Participant } from "../dto/response/Participant.js";

@Injectable()
export class AffiliationService{

    constructor(
        // @Inject("organizationImpl")
        // private readonly organizationRepository: OrganizationRepository,
        // @Inject('affiliationImpl')
        // private readonly affiliationRepository: AffiliationRepository,
        private readonly organizationHelper: OrganizationHelper,
        private readonly affiliationHelper: AffiliationHelper
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

    public async bringMyChallengeInformation(userId:number, challengeId:number): Promise<Participant>{
        const myParticipantData = await this.affiliationHelper.giveAffiliationAndUserWithUserIdAndChallengeId(userId, challengeId);
        const sortedMyParticipantData = this.sortCheeringAndPublic(new Array(myParticipantData))
        return sortedMyParticipantData[0]; 
    }


    private sortCheeringAndPublic(data: Participant[]): Participant[]{
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return data.map((user) => {
            if (!user.getCheeringPhraseDate() || !isSameDate(new Date(user.getCheeringPhraseDate()), currentDate)) {
            //    user.cheering_phrase = null;
                user.changeCheeringPhrase(null)
            } 
            if (user.getCompanyPublic() === 0) {
            //    user.getCompany() = null;
                user.changeCompany(null)
            }
            return user;
        });
    }

}