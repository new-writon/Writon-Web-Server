import { Inject, Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../domain/repository/Organization.Repository";
import { Organization } from "../domain/entity/Organization";
import { UserVerifyService } from "../domain/service/UserVerify.Service";

@Injectable()
export class OrganizationHelper{

    constructor(
        @Inject('organizationImpl')
        private readonly organizationRepository: OrganizationRepository,
        private readonly userVerifyService: UserVerifyService
    ){}


    public async giveOrganizationByName(name: string, verifyFlag:boolean): Promise<Organization>{
        const data = await this.organizationRepository.findOrganizationByName(name);
        if(verifyFlag) this.userVerifyService.verifyOrganization(data);
        return data;
    }

    public async giveAllOrganization(){
        return this.organizationRepository.findAllOrganization();
    }

    public async givePositionsByOrganizationId(organizationId:number){
        return this.organizationRepository.findPositionsByOrganizationId(organizationId)
    }

    

}