import { Injectable } from "@nestjs/common";
import { Organization } from "../domain/entity/Organization";
import { UserProfile } from "../dto/response/UserProfile";
import { OrganizationHelper } from "../helper/Organization.Helper";
import { AffiliationHelper } from "../helper/Affiliation.Helper";



@Injectable()
export class AffiliationService{

    constructor(
        private readonly organizationHelper: OrganizationHelper,
        private readonly affiliationHelper: AffiliationHelper,
    ){}

    public async penetrateAffiliation(userId:number, organization:string,     
        nickname: string,
        position: string,
        positionIntroduce: string,
        hireDate: string,
        company: string,
        companyPublic: boolean): Promise<void>{
        const organizationData: Organization = await this.organizationHelper.giveOrganizationByName(organization);
        await this.affiliationHelper.insertAffiliation(userId, organizationData.getId(), nickname, position, positionIntroduce, hireDate, company, companyPublic)
    }


    public async bringUserProfile(userId:number, organization:string):Promise<UserProfile>{
        const userProfileData:UserProfile = await this.affiliationHelper.giveUserProfileByUserIdAndOrganization(userId, organization);
        return UserProfile.of(userProfileData);
    }


    public async modifyProfileUpdate(
        userId:number,
        organization:string,
        nickname:string,
        company:string,
        hireDate:Date,
        position:string,
        positionIntroduce:string,
        companyPublic:boolean
    ){
        await this.affiliationHelper.executeUpdateUserProfileByUserIdAndOrganization(userId,organization,nickname,company,hireDate,position,positionIntroduce,companyPublic);
    }
}