import { Inject, Injectable } from "@nestjs/common";
import { AffiliationRepository } from "../domain/repository/Affiliation.Repository";
import { Affiliation } from "../domain/entity/Affiliation";

@Injectable()
export class AffiliationHelper {

    constructor(
        @Inject('affiliationImpl')
        private readonly affiliationRepository: AffiliationRepository,
    ){}

    public async giveAffiliationByUserIdAndOrganization(userId: number, organization: string): Promise<Affiliation>{
        return this.affiliationRepository.findAffiliationByUserIdAndOrganization(userId, organization);
    }




    
}