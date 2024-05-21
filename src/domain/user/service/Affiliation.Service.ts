import { Inject, Injectable } from "@nestjs/common";
import { Affiliation } from "../domain/entity/Affiliation";
import { Organization } from "../domain/entity/Organization";
import { OrganizationRepository } from "../domain/repository/Organization.Repository";
import { AffiliationRepository } from "../domain/repository/Affiliation.Repository";

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



}