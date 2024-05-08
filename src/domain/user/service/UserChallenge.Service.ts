import { Inject, Injectable } from '@nestjs/common';
import { AffiliationRepository } from '../domain/repository/Affiliation.Repository.js';
import { UserTemplateHelper } from '../../../domain/template/helper/UserTemplate.Helper.js';
import { UserTemplete } from '../../../domain/template/domain/entity/UserTemplete.js';
import { Affiliation } from '../domain/entity/Affiliation.js';
import { checkData } from '../util/checker.js';
import { TemplateStatus } from '../dto/response/TemplateStatus.js';


@Injectable()
export class UserChallengeService {
    constructor(
        @Inject('impl')
        private readonly affiliationRepository: AffiliationRepository,
        private readonly userTemplateHepler: UserTemplateHelper
  
      
    ) {}

    public async signTodayTemplateStatus(userId: number, organization: string, challengeId: number){

        const affiliationData: Affiliation = await this.affiliationRepository.findAffiliationByUserIdAndOrganization(userId, organization);
        const userTemplateData : UserTemplete[] = await this.userTemplateHepler.giveUserTemplateByAffiliationAndChallengeId(affiliationData.getId(), challengeId );
        const todayTemplateStatus : boolean = this.verifyTodayTemplateStatus(userTemplateData);
        return TemplateStatus.of(todayTemplateStatus);


    }


    private  verifyTodayTemplateStatus(userTemplete: UserTemplete[]): boolean{
        if(!checkData(userTemplete))
            return false;
        return true;
    }





}
