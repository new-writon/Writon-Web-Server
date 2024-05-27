import { Inject, Injectable } from "@nestjs/common";
import { Organization } from "../domain/entity/Organization";
import { OrganizationRepository } from "../domain/repository/Organization.Repository";
import { AffiliationRepository } from "../domain/repository/Affiliation.Repository";
import { UserProfile } from "../dto/response/UserProfile.js";

@Injectable()
export class AffiliationService{

    constructor(
        @Inject("organizationImpl")
        private readonly organizationRepository: OrganizationRepository,
        @Inject('affiliationImpl')
        private readonly affiliationRepository: AffiliationRepository,
    ){}

    public async enterAffiliation(userId:number, organization:string,     
        nickname: string,
        job: string,
        jobIntroduce: string,
        hireDate: string,
        company: string,
        companyPublic: boolean): Promise<void>{

        const organizationData: Organization = await this.organizationRepository.findOrganizationByName(organization);
        await this.affiliationRepository.insertAffiliation(userId, organizationData.getId(), nickname, job, jobIntroduce, hireDate, company, companyPublic)
    }


    public async bringUserProfileAccordingToOrganization(userId:number, organization:string):Promise<UserProfile>{
        const userProfileData:UserProfile = await this.affiliationRepository.findUserProfileByUserIdAndOrganization(userId, organization);
        return UserProfile.of(userProfileData);
    }






}