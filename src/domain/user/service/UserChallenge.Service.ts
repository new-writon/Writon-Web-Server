import { Inject, Injectable } from '@nestjs/common';
import { AffiliationRepository } from '../domain/repository/Affiliation.Repository';
import { UserTemplateHelper } from 'src/domain/template/helper/UserTemplate.Helper';
import { UserTemplete } from 'src/domain/template/domain/entity/UserTemplete';


@Injectable()
export class UserChallengeService {
    constructor(
        @Inject('impl')
        private readonly affiliationRepository: AffiliationRepository,
        private readonly userTemplateHepler: UserTemplateHelper
  
      
    ) {}

    public async signTodayTemplateStatus(userId: number, organization: string, challengeId: number){

        const affiliationData = await this.affiliationRepository.findAffiliationByUserIdAndOrganization(userId, organization);
        const userTemplateData : UserTemplete[] = await this.userTemplateHepler.giveUserTemplateByAffiliationAndChallengeId(affiliationData, challengeId );


    }


//     private async signTodayTemplateStatusCalculation(affiliationId: number, challengeId: number){

//     if (!await userTemplateDao.signTodayTemplate(affiliationId, challengeId)) {

//         return {
//             todayTemplateStatus: false
//         }
//     }
//     return {
//         todayTemplateStatus: true

//     }
// }


}
