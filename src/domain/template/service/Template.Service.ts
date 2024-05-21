import { Inject, Injectable } from '@nestjs/common';
import { AffiliationHelper } from '../../user/helper/Affiliation.Helper.js';
import { UserTemplateRepository } from '../domain/repository/UserTemplate.Repository.js';
import { TemplateContent, TemplateContentArray } from '../dto/response/TemplateContent.js';
import { UserApi } from '../infrastructure/User.Api.js';


@Injectable()
export class TemplateService {
    constructor(
     //   private readonly affiliationHelper: AffiliationHelper,
        private readonly userApi: UserApi,
        @Inject('usertemplateImpl')
        private readonly userTemplateRepository: UserTemplateRepository,
      ) {}




    public async bringMyTemplate(userId: number, organization: string, challengeId:number): Promise<TemplateContent[][]>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        const templateContentData : TemplateContent[] = await this.userTemplateRepository.findUserTemplateByChallengeIdForAffiliationId(affiliationData.getAffiliationId(), challengeId);
        const sortResult = this.sortAccorgindToUserTemplateId(templateContentData);
        
        return sortResult;
    }


private sortAccorgindToUserTemplateId(userTemplates: TemplateContent[]):  TemplateContent[][]{
    const sortedUserTemplate : TemplateContent[][]= [];
    const uniqueUserTemplateIds = Array.from(new Set(userTemplates.map((q) => q.user_templete_id)));
    for (const userTemplateId of uniqueUserTemplateIds) {
        const filteredQuestions = userTemplates.filter((q) => q.user_templete_id === userTemplateId);
        sortedUserTemplate.push(filteredQuestions);
    }
    return sortedUserTemplate;
}



 


}
