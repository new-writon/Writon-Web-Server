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
import { sortCompanyPublic } from '../util/data.js';



@Injectable()
export class TemplateService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly userApi: UserApi,
        private readonly challengeApi: ChallengeApi,
        private readonly userTemplateHelper: UserTemplateHelper,
        private readonly userTemplateTransaction: UserTemplateTransaction,
      ) {}


    public async bringTemplateOne(userId:number, userTemplateId:number, organization:string, visibility: boolean):Promise<TemplateContent[]>{
        const affiliationData = await this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization);
        console.log(affiliationData.getAffiliationId())
        // 1. 유저템플릿과 좋아요, 댓글, 대답 조회
        const userTemplateData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId, visibility);
        // 2. 질문 id, 질문 내용 조회
        const questionIds = this.extractQuestionId(userTemplateData);
        const questionData = await this.challengeApi.requestQuestionById(questionIds);
        // 3. 데이터 결합
        const mergedForOneTemplate = this.mergeForOneTemplate(affiliationData, userTemplateData, questionData);
        console.log(mergedForOneTemplate)
        const sortedCompanyData = sortCompanyPublic(mergedForOneTemplate); 
        console.log(sortedCompanyData)
        return sortedCompanyData;
    }
    


    public async bringTemplateAccordingToDate(userId:number, organization:string, challengeId:number, date:Date){
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);

        // 1. 챌린지에 따른 유저 챌린지배열 조회 -> challengeId
            // "job": "기획", 
            // "company": "LINE", 
            // "company_public": 1, 
            // "nickname": "이도운", 
            // "profile": null, 
            // "affiliation_id": 50 
        const userChallengeData = await this.userApi.requestUserChallengeAndAffiliationAndUserByChallengeId(challengeId);
        console.log(userChallengeData)

    

        // 2. 유저 챌린지 Id 추출
        const userChallengeIds = this.extractUserChallengeId(userChallengeData);

        // 3. 유저챌린지와 날짜에 따른 템플릿 배열 조회
            // "likeCount": "3", 
            // "commentCount": "0", 
            // "myLikeSign": "0"
            // "created_at": "2024-02-15T00:00:00.000Z", 
            // "question_id": 65, 
            // "user_templete_id": 133, 
            // "question_content_id": 566, 
            // "content": "명탐정 코난 보기 & 운동하기 (자전거 or 계단 오르기)", "visibility": 1, 
            // "category": "스페셜 질문", 
            // "question": "나만의 스트레스 해소법은 무엇인가요?"

        const userTemplateData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeIds, date);
        console.log(userTemplateData)

        // 4. QuestionContent에 있는 question_id 에 따른 값과 내용 조회


        // 5. affiliationId 비교 로직


        // 6. userTemplates별 question 값 결합하기

        
        // 7. userChallenges, userTemplates 데이터 결합

    }

    private distinguishMyLike(affiliationId: number, userTemplates: UserTemplete[]){
        return userTemplates.map(userTemplate => {
          const hasAffiliationId = userTemplate.likes.some(l => l.getAffiliationId()=== affiliationId);
          return {
            ...userTemplate,
            myLikeSign: hasAffiliationId
          };
        });

    }

    // private mergeUserChallengeAndUserTemplate(userChallenges:UserChallenge[], userTemplates:UserTemplete[]){
    // }

    // private mergeUserChallengeAndUserTemplate(userChallenges: UserChallenge[], userTemplates: UserTemplete[]): any[] {
    //     const mergedList: any[] = [];
      
    //     userChallenges.forEach(userChallenge => {
    //       const matchingTemplate = userTemplates.find(template => template.user_challenge_id === userChallenge.user_challenge_id);
    //       if (matchingTemplate) {
    //         const questionContents = matchingTemplate.questionContents.map(question => ({
    //           question_id: question.getId(),
    //           user_templete_id: question.,
    //           question_content_id: question.question_content_id,
    //           content: question.content,
    //           visibility: question.visibility,
    //           created_at: question.created_at,
    //           category: question.category,
    //           question: question.question,
    //           job: question.job,
    //           company: question.company,
    //           company_public: question.company_public,
    //           nickname: question.nickname,
    //           profile: question.profile,
    //           affiliation_id: question.affiliation_id,
    //           likeCount: question.likeCount,
    //           commentCount: question.commentCount,
           
    //         }));
      
    //         mergedList.push(questionContents);
    //       }
    //     });
      
    //     return mergedList;
    //   }


    private mergeForOneTemplate(affiliationData: Affiliation, userTemplateData: UserTemplete, questionDatas: Question[]) {
        return questionDatas.map((questionData) => {
            const questionContent = userTemplateData.getQuestionContents().find(
                (content) => content.getQuestionId() === questionData.getId()
            );
            const likeCount = userTemplateData.getLikes().length;
            const commentCount = userTemplateData.getComments().length;
            const myLikeSign = userTemplateData.likes.some((like) => like.getAffiliationId() === affiliationData.getId()) ? '1' : '0';
            return TemplateContent.of(   
                affiliationData.getJob(),  
                affiliationData.getNickname(),   
                affiliationData.getCompany(),
                affiliationData.getCompanyPublic(),  
                affiliationData.getUser().getProfileImage(),      
                questionData.getId(),
                userTemplateData.getId(),
                questionContent.getId(),
                questionContent.getContent(),
                formatDate(userTemplateData.getCreatedAt().toString()),
                questionContent.getVisibility(),
                questionData.getCategory(),
                questionData.getQuestion(),
                likeCount.toString(),
                commentCount.toString(),
                myLikeSign
            )
        //     return {
        //         question_id: questionData.getId(),
        //         user_templete_id: userTemplateData.getId(),
        //         question_content_id: questionContent.getId(),
        //         content: questionContent.getContent(),
        //         visibility: questionContent.getVisibility(),
        //         category: questionData.getCategory(),
        //         question: questionData.getQuestion(),
        //         created_at: formatDate(userTemplateData.getCreatedAt().toString()),
        //         job: affiliationData.getJob(),
        //         company: affiliationData.getCompany(),
        //         company_public: affiliationData.getCompanyPublic(),
        //         nickname: affiliationData.getNickname(),
        //         profile: affiliationData.getUser().getProfileImage(),
        //   //      affiliation_id: affiliationData.getId(),
        //         likeCount: likeCount.toString(),
        //         commentCount: commentCount.toString(),
        //         myLikeSign: myLikeSign
        //     };
        }).filter(item => item !== null);
    }
    


    private extractQuestionId(userTemplate:UserTemplete){
        return userTemplate.getQuestionContents().map((data)=> data.getQuestionId())
    }


    private extractUserChallengeId(userChallenge:UserChallenge[]){
        return userChallenge.map((data)=> data.getId())
    }


    public async bringMyTemplate(userId: number, organization: string, challengeId:number): Promise<TemplateContent[][]>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        const templateContentData : TemplateContent[] = await this.userTemplateHelper.giveUserTemplateByChallengeIdForAffiliationId(affiliationData.getAffiliationId(), challengeId);
        const sortResult = this.sortAccorgindToUserTemplateId(templateContentData);  
        return sortResult;
    }

    @Transactional()
    public async writeTemplate(  
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


    public async updateMyTemplate(
        userTemplateId:number,
        templateContent:Array<WriteTemplateContent>):Promise<void>{
            console.log(userTemplateId)
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





