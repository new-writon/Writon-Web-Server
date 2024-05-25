import { Inject, Injectable } from '@nestjs/common';
import { AffiliationHelper } from '../../user/helper/Affiliation.Helper.js';
import { UserTemplateRepository } from '../domain/repository/UserTemplate.Repository.js';
import { TemplateContent, TemplateContentArray } from '../dto/response/TemplateContent.js';
import { UserApi } from '../infrastructure/User.Api.js';
import { WriteTemplateContent } from '../dto/TemplateContent.js';
import { ChallengeApi } from '../infrastructure/Challenge.Api.js';
import { dataSource } from 'src/global/config/database.js';
import { UserTemplateTransaction } from '../domain/repository/transaction/UserTemplate.Transaction.js';


@Injectable()
export class TemplateService {
    constructor(
        private readonly userApi: UserApi,
        private readonly challengeApi: ChallengeApi,
        @Inject('usertemplateImpl')
        private readonly userTemplateRepository: UserTemplateRepository,
        private readonly userTemplateTransaction: UserTemplateTransaction
      ) {}




    public async bringMyTemplate(userId: number, organization: string, challengeId:number): Promise<TemplateContent[][]>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        const templateContentData : TemplateContent[] = await this.userTemplateRepository.findUserTemplateByChallengeIdForAffiliationId(affiliationData.getAffiliationId(), challengeId);
        const sortResult = this.sortAccorgindToUserTemplateId(templateContentData);  
        return sortResult;
    }


    public async writeTemplate(  
        userId: number,
        challengeId: number,
        organization: string,
        date: string,
        templateContent: Array<WriteTemplateContent>): Promise<void>{

            const [userChallengeData, userTemplateComplete] = await Promise.all([
                this.userApi.requestUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId),
                this.signUserChallengeComplete(challengeId, date)
            ]);
            await this.userTemplateTransaction.insertTemplateTransaction(userChallengeData[0].user_challenge_id, new Date(date), userTemplateComplete, templateContent)

    } 



    private async signUserChallengeComplete (
        challengeId: number,
        date: string
    ){
        let complete = true;
        if (new Date(date).setHours(0, 0, 0, 0).toLocaleString() !== new Date().setHours(0, 0, 0, 0).toLocaleString()) {
            complete = false;
        }
        if (!await this.challengeApi.requestChallengeDayByChallengeIdAndDate(challengeId, new Date(date))) {
            complete = false;
        }  
        return complete; 
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
