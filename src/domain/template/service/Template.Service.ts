import { Inject, Injectable } from '@nestjs/common';
import { TemplateContent } from '../dto/response/TemplateContent.js';
import { UserApi } from '../infrastructure/User.Api.js';
import { WriteTemplateContent } from '../dto/TemplateContent.js';
import { ChallengeApi } from '../infrastructure/Challenge.Api.js';
import { UserTemplateTransaction } from '../domain/repository/transaction/UserTemplate.Transaction.js';
import { UserTemplateHelper } from '../helper/UserTemplate.Helper.js';
import { CommentHelper } from '../helper/Comment.Helper.js';
import { LikeHelper } from '../helper/Like.Helper.js';
import { Comment } from '../domain/entity/Comment.js';
import { Likes } from '../domain/entity/Likes.js';


@Injectable()
export class TemplateService {
    constructor(
        private readonly userApi: UserApi,
        private readonly challengeApi: ChallengeApi,
        private readonly userTemplateHelper: UserTemplateHelper,
        private readonly userTemplateTransaction: UserTemplateTransaction,
        private readonly commentHelper: CommentHelper,
        private readonly likeHelper: LikeHelper
      ) {}




    public async bringMyTemplate(userId: number, organization: string, challengeId:number): Promise<TemplateContent[][]>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        const templateContentData : TemplateContent[] = await this.userTemplateHelper.giveUserTemplateByChallengeIdForAffiliationId(affiliationData.getAffiliationId(), challengeId);
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


    public async updateMyTemplate(
        userTemplateId:number,
        templateContent:Array<WriteTemplateContent>):Promise<void>{
            console.log(userTemplateId)
            await this.userTemplateTransaction.updateTemplateTransaction(userTemplateId, templateContent);
    }

    public async bringNotify(  
        userId: number,
        organization: string,
        challengeId: number): Promise<any>{

            // 1. 각 userTemplate와 affiliation를 조인하여 데이터를 가져온다.
            let [commentData, likeData] = await Promise.all([
                this.commentHelper.giveCommentWithUserIdAndOrganizationAndChallengeId(userId, organization, challengeId),
                this.likeHelper.giveLikeWithUserIdAndOrganizationAndChallengeId(userId, organization, challengeId)
            ]);
            console.log(commentData)
            console.log(likeData)

            // 2. userId와 organization을 통한 affiliation 데이터를 조회
            const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);

            const userChallengeIdOfComment = this.sortUserChallengeIdOfComment(commentData);
            const userChallengeIdOfLike = this.sortUserChallengeIdOfLike(likeData);

            // 3. 각 commentData와 likeData의 userTemplate의 userChallengeId를 통해서 affiliation 데이터를 가져온다.
            // (단 조건은, challengeId를 활용한다.)
            let [commentAffiliationData, likeAffiliationData] = await Promise.all([
                this.userApi.requestAffilaitonWithChallengeIdAndUserChallengeId(challengeId, userChallengeIdOfComment),
                this.userApi.requestAffilaitonWithChallengeIdAndUserChallengeId(challengeId, userChallengeIdOfLike)

            ]);
            console.log(commentAffiliationData.length)
            console.log(likeAffiliationData.length)

            // 4. 3번의 affiliation_id 와 2번의 affiliation_id가 같은 값을 거른다.


            // 5. comment와 like 데이터를 3번에서 조회한 affiliation_id와 2번에서 조회한 affiliation_id와 같지 않는 값들을 거른다.

            // 6. 4번에서 나온 데이터를 기존 쿼리 형식에 맞게 매핑한다.      
    } 

    private sortUserChallengeIdOfComment(data: Comment[]){
        return data.map((data) =>{
            return data.userTemplete.getUserChallengeId()        
        })
    }


    private sortUserChallengeIdOfLike(data: Likes[]){
        return data.map((data) =>{
            return data.userTemplete.getUserChallengeId()        
        })
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
