import { Inject, Injectable } from "@nestjs/common";
import { SatisfactionRepository } from "../domain/repository/Satisfaction.Repository";
import { SatisfactionVerifyService } from "../domain/service/SatisfactionVerify.Service";
import { Satisfaction } from "../domain/entity/Satisfaction";


@Injectable()
export class SatisfactionHelper{

    constructor(
        @Inject('satisfactionImpl')
        private readonly satisfactionRepository:SatisfactionRepository,
        private readonly satisfactionVerifyService:SatisfactionVerifyService
    ){}

    public async giveSatisfactionByChallengeId(challengeId:number):Promise<Satisfaction[]>{
        const satisfactionData = await this.satisfactionRepository.findSatisfactionByChallengeId(challengeId);
        this.satisfactionVerifyService.verifySatisfaction(satisfactionData)
        return satisfactionData;
    }

}