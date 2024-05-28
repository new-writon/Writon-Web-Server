import { Inject, Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../domain/repository/Organization.Repository.js";
import { Organization } from "../domain/entity/Organization.js";

@Injectable()
export class OrganizationHelper{

    constructor(
        @Inject('organizationImpl')
        private readonly organizationRepository: OrganizationRepository
    ){}


    public async giveOrganizationByName(name: string): Promise<Organization>{
        return this.organizationRepository.findOrganizationByName(name);
    }

}