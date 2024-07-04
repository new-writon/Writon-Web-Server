import {  Injectable } from '@nestjs/common';
import { TemplateContent } from '../dto/response/TemplateContent.js';
import { UserApi } from '../infrastructure/User.Api.js';
import { WriteTemplateContent } from '../dto/TemplateContent.js';
import { ChallengeApi } from '../infrastructure/Challenge.Api.js';
import { UserTemplateTransaction } from '../domain/repository/transaction/UserTemplate.Transaction.js';
import { UserTemplateHelper } from '../helper/UserTemplate.Helper.js';
import { UserTemplete } from '../domain/entity/UserTemplete.js';
import { UserChallenge } from '../../user/domain/entity/UserChallenge.js';
import { Affiliation } from '../../user/domain/entity/Affiliation.js';
import { Transactional } from '../../../global/decorator/transaction.js';
import {  DataSource } from 'typeorm';
import { Question } from 'src/domain/challenge/domain/entity/Question.js';
import { formatDate } from '../util/date.js';
import { sortCompanyPublic, sortCompanyPublicArray } from '../util/data.js';
import { TemplateVerifyService } from '../domain/service/TemplateVerify.Service.js';
import { TemplateInformation } from '../dto/response/TemplateInformation.js';



@Injectable()
export class TemplateService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly userApi: UserApi,
        private readonly challengeApi: ChallengeApi,
        private readonly userTemplateHelper: UserTemplateHelper,
        private readonly userTemplateTransaction: UserTemplateTransaction,
        private readonly templateVerifyService: TemplateVerifyService
      ) {}


    public async bringTemplateContent(userId:number, userTemplateId:number, organization:string, visibility: boolean):Promise<TemplateContent[]>{
        // 1. 유저템플릿과 좋아요, 댓글, 대답 조회
        // 2. 질문 id, 질문 내용 조회
        const [affiliationData, userTemplateData] = await Promise.all([
            this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization),
            this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId, visibility)
        ]);
        this.templateVerifyService.verifyUserTemplate(userTemplateData)
        const questionIds = this.extractQuestionId(userTemplateData);
        const [questionData, userChallengeData]= await Promise.all([
            this.challengeApi.requestQuestionById(questionIds),
            this.userApi.requestUserChallengeAndAffiliationAndUserById(userTemplateData.getUserChallengeId())
        ]);    
        // 3. 데이터 결합
        const mergedForOneTemplate = this.mergeForOneTemplate(affiliationData, userTemplateData, questionData, userChallengeData);
        const sortedCompanyData = sortCompanyPublic(mergedForOneTemplate); 
        return sortedCompanyData;
    }
    


    public async bringTemplateAccordingToDate(userId:number, organization:string, challengeId:number, date:Date):Promise<TemplateInformation>{
        // 내 조직 정보 가져오기
        // 챌린지에 따른 유저 챌린지배열 조회 
        const [affiliationData, userChallengeDatas] = await Promise.all([
            this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization),
            this.userApi.requestUserChallengeAndAffiliationAndUserByChallengeId(challengeId)
        ]);
        // 유저 챌린지 Id 추출
        const userChallengeIds = this.extractUserChallengeId(userChallengeDatas);
        // 유저챌린지와 날짜에 따른 템플릿 배열 조회
        const userTemplateData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeIds, date);
        this.templateVerifyService.verifyUserTemplates(userTemplateData)
        const questionIds = this.extractQuestionIds(userTemplateData);
        // QuestionContent에 있는 question_id 에 따른 값과 내용 조회
        const questionData = await this.challengeApi.requestQuestionById(questionIds);
        const challengeCompleteCount = this.extractCompleteCount(userTemplateData);
        const mergedForManyTemplates = this.mergeForManyTemplates(affiliationData, userTemplateData, questionData, userChallengeDatas);
        const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates); 
        return TemplateInformation.of(challengeCompleteCount, sortedCompanyData);
    }

    private mergeForOneTemplate(affiliationData: Affiliation, userTemplateData: UserTemplete, questionDatas: Question[], userChallengeData:UserChallenge) {
        return questionDatas.map((questionData) => {
            const questionContent = userTemplateData.getQuestionContents().find(
                (content) => content.getQuestionId() === questionData.getId());
            if (!questionContent) return null;
            const likeCount = userTemplateData.getLikes().length;
            const commentCount = userTemplateData.getComments().length;
            const myLikeSign = userTemplateData.likes.some((like) => like.getAffiliationId() === affiliationData.getId()) ? '1' : '0';
            return TemplateContent.of(   
                userChallengeData.getAffiliation().getJob(),
                userChallengeData.getAffiliation().getNickname(),
                userChallengeData.getAffiliation().getCompany(),
                userChallengeData.getAffiliation().getCompanyPublic(),
                userChallengeData.getAffiliation().getUser().getProfileImage(),
                questionData.getId(),
                userTemplateData.getId(),
                questionContent.getId(),
                questionContent.getContent(),
                formatDate(userTemplateData.getCreatedAt().toString()),
                questionContent.getVisibility(),
                questionData.getCategory(),
                questionData.getQuestion(),
                userChallengeData.getAffiliation().getId(),
                likeCount.toString(),
                commentCount.toString(),
                myLikeSign
            )}).filter(item => item !== null);
    }

    private mergeForManyTemplates(affiliationData: Affiliation, userTemplateDatas: UserTemplete[], questionDatas: Question[], userChallengeDatas:UserChallenge[]) {
        return userTemplateDatas.map(userTemplateData => {
            return questionDatas.map(questionData => {
                const questionContent = userTemplateData.getQuestionContents().find((content) => content.getQuestionId() === questionData.getId());
                if (!questionContent) return null;
                const userChallengeData = userChallengeDatas.find((content) => content.getId() === userTemplateData.getUserChallengeId());
                const likeCount = userTemplateData.getLikes().length;
                const commentCount = userTemplateData.getComments().length;
                const myLikeSign = userTemplateData.likes.some((like) => like.getAffiliationId() === affiliationData.getId()) ? '1' : '0';
                return TemplateContent.of(
                    userChallengeData.getAffiliation().getJob(),
                    userChallengeData.getAffiliation().getNickname(),
                    userChallengeData.getAffiliation().getCompany(),
                    userChallengeData.getAffiliation().getCompanyPublic(),
                    userChallengeData.getAffiliation().getUser().getProfileImage(),
                    questionData.getId(),
                    userTemplateData.getId(),
                    questionContent.getId(),
                    questionContent.getContent(),
                    formatDate(userTemplateData.getCreatedAt().toString()),
                    questionContent.getVisibility(),
                    questionData.getCategory(),
                    questionData.getQuestion(),
                    userChallengeData.getAffiliation().getId(),
                    likeCount.toString(),
                    commentCount.toString(),
                    myLikeSign
                );
            }).filter(item => item !== null);
        });
    }

    private extractCompleteCount(userTemplates:UserTemplete[]){
        return userTemplates.map((userTemplate)=>userTemplate.getComplete()).length;
    }
    
    
    private extractQuestionId(userTemplate:UserTemplete){
        return userTemplate.getQuestionContents().map((data)=> data.getQuestionId())
    }

    private extractQuestionIds(userTemplates:UserTemplete[]){
        return userTemplates.flatMap((userTemplate)=>{
            return userTemplate.getQuestionContents().map((questionContent) =>
               questionContent.getQuestionId()
            )
        })
    }

    private extractUserChallengeId(userChallenge:UserChallenge[]){
        return userChallenge.map((data)=> data.getId())
    }

    public async bringAllTemplateContent(userId: number, organization: string, challengeId:number): Promise<TemplateContent[][]>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        const templateContentData : TemplateContent[] = await this.userTemplateHelper.giveUserTemplateByChallengeIdForAffiliationId(affiliationData.getAffiliationId(), challengeId);
        const sortResult = this.sortAccorgindToUserTemplateId(templateContentData);  
        return sortResult;
    }

    @Transactional()
    public async penetrateTemplate(  
        userId: number,
        challengeId: number,
        organization: string,
        date: string,
        templateContent: Array<WriteTemplateContent>): Promise<void>{
            const [userChallengeData, userTemplateComplete] = await Promise.all([
                this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId, userId, organization),
                this.signUserChallengeComplete(challengeId, date)
            ]);
            await this.userTemplateTransaction.insertTemplateTransaction(userChallengeData.getId(), new Date(date), userTemplateComplete, templateContent)
    } 


    public async modifyMyTemplate(
        userTemplateId:number,
        templateContent:Array<WriteTemplateContent>):Promise<void>{
            await this.userTemplateTransaction.updateTemplateTransaction(userTemplateId, templateContent);
    }

    public async bringNotify(  
        userId: number,
        organization: string,
        challengeId: number): Promise<(GetCommentNotify | GetLikeNotify)[]>{

            // 1. 챌린지 id, 조직, 유저id를 통해 userChallenge, affiliation을 가져온다.
            const userChallengeAndAffiliationData = await this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId, userId, organization);

            // 2. userChallengeId를 통해 userTemplate데이터, comment, like 를 모두 가져온다.
            const userTemplateAndCommentAndLikeData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeAndAffiliationData.getId());

            // 3. 댓글, 좋아요를 누른 유저의 affiliationId 추출
            const extractAffiliationId = this.extractAffiliationIdAccordingToCommentAndLike(userTemplateAndCommentAndLikeData);
            // 4. 각 좋아요와 댓글을 단 유저의 affiliation 데이터를 가져옴.
            let [commentAffiliationData, likeAffiliationData] = await Promise.all([
                this.userApi.requestAffiliationById(extractAffiliationId.commentAffiliationIds),
                this.userApi.requestAffiliationById(extractAffiliationId.likeAffiliationIds)
            ]);
            // 5. comment, like를 내 정보를 제외한 각 유저의 affiliation을 적용한다.
            const sortedComment = this.makeCommentShapeAccordingToUserTemplate(userTemplateAndCommentAndLikeData, userChallengeAndAffiliationData, commentAffiliationData);
            const sortedLike = this.makeLikeShapeAccordingToUserTemplate(userTemplateAndCommentAndLikeData, userChallengeAndAffiliationData, likeAffiliationData);
            // 6. comment, like의 데이터를 시간 순으로 나열한다.
            const mergedCommentAndLike = this.mergeAndSortTimeCommentAndLike(sortedComment, sortedLike);
            return mergedCommentAndLike;
    } 



    private extractAffiliationIdAccordingToCommentAndLike(userTemplate:UserTemplete[]){
        const commentAffiliationIds: number[] = userTemplate.flatMap(userTemplate => userTemplate.comments.map(comment => comment.getAffiliationId()));
        const likeAffiliationIds: number[] = userTemplate.flatMap(userTemplate => userTemplate.likes.map(like => like.getAffiliationId()));
        return { commentAffiliationIds, likeAffiliationIds };
    }
    
    /**
     * 
     * @param userTemplate 유저 챌린지에서 작성한 템플릿 데이터
     * @param userChallengeAndAffiliationData 유저 챌린지와 소속 데이터가 포함된 데이터
     * @returns 유저가 자신의 템플릿에 단 댓글이 제거된 데이터
     */
    private makeCommentShapeAccordingToUserTemplate(userTemplate: UserTemplete[], userChallengeAndAffiliationData: UserChallenge, affiliation: Affiliation[]):GetCommentNotify[] {
        return userTemplate.flatMap((userTemplate) => 
            userTemplate.comments
                .filter((comment) => comment.getAffiliationId() !== userChallengeAndAffiliationData.affiliation.getId())
                .map((comment) => {
                    const matchedAffiliation = affiliation.find(affiliation => affiliation.getId() === comment.getAffiliationId());
                    return {
                    commentId: comment.getId(),
                    content: comment.getContent(),
                    createdAt: comment.getCreatedAt(),
                    sign: comment.getCheck(),
                    userTempleteId: userTemplate.getId(),
                    templateName: userTemplate.getFinishedAt(),
                    nickname:matchedAffiliation.getNickname(),
                    type: "comment"
                    }
                }));
    }
    

    private makeLikeShapeAccordingToUserTemplate(userTemplate: UserTemplete[], userChallengeAndAffiliationData:UserChallenge, affiliation: Affiliation[]):GetLikeNotify[]{
        return userTemplate.flatMap((userTemplate) => userTemplate.likes.filter((like)=> like.getAffiliationId() !== userChallengeAndAffiliationData.affiliation.getId())
        .map((like) => {
            const matchedAffiliation = affiliation.find(affiliation => affiliation.getId() === like.getAffiliationId());
            return {
            likeId: like.getId(),
            createdAt: like.getCreatedAt(),
            sign: like.getCheck(),
            userTempleteId: userTemplate.getId(),
            templateName: userTemplate.getFinishedAt(),
            nickname: matchedAffiliation.getNickname(),
            type: "like"
            }
        }));
    }


    private mergeAndSortTimeCommentAndLike(comments: GetCommentNotify[], likes: GetLikeNotify[]){
        const mergedArray: (GetCommentNotify | GetLikeNotify)[] = [...comments, ...likes];
        mergedArray.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();});
        return mergedArray;
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





