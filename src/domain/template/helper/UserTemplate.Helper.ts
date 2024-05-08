import { Inject, Injectable } from "@nestjs/common";
import { UserTemplateRepository } from "../domain/repository/UserTemplate.Repository.js";
import { UserTemplete } from "../domain/entity/UserTemplete.js";

@Injectable()
export class UserTemplateHelper{


    constructor(
        @Inject('impl')
        private readonly userTemplateRepository: UserTemplateRepository,
    ){}

    public async giveUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplete[]>{

        return this.userTemplateRepository.findUserTemplateByAffiliationAndChallengeId(affiliationId, challengeId);

    }

}