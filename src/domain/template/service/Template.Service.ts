import {  Injectable } from '@nestjs/common';
import { TemplateContent } from '../dto/response/TemplateContent';
import { UserApi } from '../infrastructure/User.Api';
import { WriteTemplateContent } from '../dto/values/TemplateContent';
import { ChallengeApi } from '../infrastructure/Challenge.Api';
import { UserTemplateTransaction } from '../domain/repository/transaction/UserTemplate.Transaction';
import { UserTemplateHelper } from '../helper/UserTemplate.Helper';
import { UserTemplate } from '../domain/entity/UserTemplate';
import { UserChallenge } from '../../user/domain/entity/UserChallenge';
import { Affiliation } from '../../user/domain/entity/Affiliation';
import { Transactional } from '../../../global/decorator/transaction';
import {  DataSource } from 'typeorm';
import { Question } from 'src/domain/challenge/domain/entity/Question';
import { formatDate } from '../util/date';
import { sortCompanyPublic, sortCompanyPublicArray } from '../util/data';
import { TemplateInformation } from '../dto/response/TemplateInformation';
import { TemplateWrite } from '../dto/request/TemplateWrite';
import { DataMapperService } from '../domain/service/DataMappper.Service';



@Injectable()
export class TemplateService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly userApi: UserApi,
        private readonly challengeApi: ChallengeApi,
        private readonly userTemplateHelper: UserTemplateHelper,
        private readonly dataMapperService: DataMapperService,
        private readonly userTemplateTransaction: UserTemplateTransaction,
      ) {}


    public async bringTemplateContent(userId:number, userTemplateId:number, organization:string, visibility: boolean):Promise<TemplateContent[]>{
        const [affiliationData, userTemplateData] = await Promise.all([
            this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization,false),
            this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId, visibility, false)
        ]);
        return userTemplateData === null? []:this.proccessTemplateContent(userTemplateData, affiliationData);
    }

    private async proccessTemplateContent(userTemplateData:UserTemplate, affiliationData:Affiliation){
        const questionIds = this.dataMapperService.extractQuestionId(userTemplateData);
        const [questionData, userChallengeData]= await Promise.all([
            this.challengeApi.requestQuestionById(questionIds,false),
            this.userApi.requestUserChallengeAndAffiliationAndUserById(userTemplateData.getUserChallengeId(),false)
        ]);    
        const mergedForOneTemplate = this.mergeForOneTemplate(affiliationData, userTemplateData, questionData, userChallengeData);
        const sortedCompanyData = sortCompanyPublic(mergedForOneTemplate) as TemplateContent[];
        return sortedCompanyData;
    }
    


    public async bringTemplateAccordingToDate(userId:number, organization:string, challengeId:number, date:Date):Promise<TemplateInformation | []>{
        const [affiliationData, userChallengeDatas] = await Promise.all([
            this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization,false),
            this.userApi.requestUserChallengeAndAffiliationAndUserByChallengeId(challengeId,false)
        ]);
        const userChallengeIds = this.extractUserChallengeId(userChallengeDatas);
        const userTemplateData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(userChallengeIds, date, false);
        return userTemplateData.length === 0 ? []:this.proccessTemplateAccordingToDateData(userTemplateData,affiliationData,userChallengeDatas)
    }

    private async proccessTemplateAccordingToDateData(userTemplateData:UserTemplate[], affiliationData:Affiliation, userChallengeDatas:UserChallenge[]){
        const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData);
        const questionData = await this.challengeApi.requestQuestionById(questionIds,false);
        const challengeCompleteCount = this.dataMapperService.extractCompleteCount(userTemplateData);
        const mergedForManyTemplates = this.mergeForManyTemplates(affiliationData, userTemplateData, questionData, userChallengeDatas);
        const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates); 
        return TemplateInformation.of(challengeCompleteCount, sortedCompanyData);
    }

    private mergeForOneTemplate(affiliationData: Affiliation, userTemplateData: UserTemplate, questionDatas: Question[], userChallengeData:UserChallenge) {
        return questionDatas.map((questionData) => {
            const questionContent = userTemplateData.getQuestionContents().find(
                (content) => content.getQuestionId() === questionData.getId());
            if (!questionContent) return null;
            const likeCount = userTemplateData.getLikes().length;
            const commentCount = userTemplateData.getComments().length;
            const myLikeSign = userTemplateData.likes.some((like) => like.getAffiliationId() === affiliationData.getId()) ? '1' : '0';
            return TemplateContent.of(   
                userChallengeData.getAffiliation().getPosition(), 
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

    private mergeForManyTemplates(affiliationData: Affiliation, userTemplateDatas: UserTemplate[], questionDatas: Question[], userChallengeDatas:UserChallenge[]) {
        return userTemplateDatas.map(userTemplateData => {
            return questionDatas.map(questionData => {
                const questionContent = userTemplateData.getQuestionContents().find((content) => content.getQuestionId() === questionData.getId());
                if (!questionContent) return null;
                const userChallengeData = userChallengeDatas.find((content) => content.getId() === userTemplateData.getUserChallengeId());
                const likeCount = userTemplateData.getLikes().length;
                const commentCount = userTemplateData.getComments().length;
                const myLikeSign = userTemplateData.likes.some((like) => like.getAffiliationId() === affiliationData.getId()) ? '1' : '0';
                return TemplateContent.of(
                    userChallengeData.getAffiliation().getPosition(),
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


    private extractUserChallengeId(userChallenge:UserChallenge[]){
        return userChallenge.map((data)=> data.getId())
    }

    public async bringAllTemplateContent(userId: number, organization: string, challengeId:number):Promise<TemplateInformation | []>{
        const [affiliationData, userChallengeDatas] = await Promise.all([
            this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization,false),
            this.userApi.requestUserChallengeAndAffiliationAndUserByChallengeId(challengeId,false)
        ]);
        const userChallengeIds = this.extractUserChallengeId(userChallengeDatas);
        const userTemplateData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(userChallengeIds, false);
        return userTemplateData.length === 0 ? []:this.proccessTemplateData(userTemplateData,affiliationData,userChallengeDatas)
    }
    
    private async proccessTemplateData(userTemplateData:UserTemplate[], affiliationData:Affiliation, userChallengeDatas:UserChallenge[]){
        const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData);
        const questionData = await this.challengeApi.requestQuestionById(questionIds,false);
        const mergedForManyTemplates = this.mergeForManyTemplates(affiliationData, userTemplateData, questionData, userChallengeDatas);
        const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates); 
        return TemplateInformation.of(undefined, sortedCompanyData);
    }

    @Transactional()
    public async penetrateTemplate(  
        userId: number,
        templateWrite: TemplateWrite): Promise<void>{
            const [userChallengeData, userTemplateComplete] = await Promise.all([
                this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(templateWrite.getChallengeId(), userId, templateWrite.getOrganization(),true),
                this.signUserChallengeComplete(templateWrite.getChallengeId(), templateWrite.getDate())
            ]);
            await this.userTemplateTransaction.insertTemplateTransaction(userChallengeData.getId(), new Date(templateWrite.getDate()), userTemplateComplete, templateWrite.getTemplateContent())
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
            const userChallengeAndAffiliationData = await this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId, userId, organization,false);
            const userTemplateAndCommentAndLikeData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeAndAffiliationData.getId(), false);
            return userTemplateAndCommentAndLikeData.length === 0 ? []: this.proccessNotifyData(userTemplateAndCommentAndLikeData, userChallengeAndAffiliationData)
    } 

    private async proccessNotifyData(userTemplateAndCommentAndLikeData:UserTemplate[], userChallengeAndAffiliationData:UserChallenge){
          const extractAffiliationId = this.extractAffiliationIdAccordingToCommentAndLike(userTemplateAndCommentAndLikeData);
          let [commentAffiliationData, likeAffiliationData] = await Promise.all([
              this.userApi.requestAffiliationById(extractAffiliationId.commentAffiliationIds,false),
              this.userApi.requestAffiliationById(extractAffiliationId.likeAffiliationIds,false)
          ]);
          const sortedComment = this.makeCommentShapeAccordingToUserTemplate(userTemplateAndCommentAndLikeData, userChallengeAndAffiliationData, commentAffiliationData);
          const sortedLike = this.makeLikeShapeAccordingToUserTemplate(userTemplateAndCommentAndLikeData, userChallengeAndAffiliationData, likeAffiliationData);
          const mergedCommentAndLike = this.mergeAndSortTimeCommentAndLike(sortedComment, sortedLike);
          return mergedCommentAndLike;
    }

    private extractAffiliationIdAccordingToCommentAndLike(userTemplate:UserTemplate[]){
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
    private makeCommentShapeAccordingToUserTemplate(userTemplate: UserTemplate[], userChallengeAndAffiliationData: UserChallenge, affiliation: Affiliation[]):GetCommentNotify[] {
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
                    userTemplateId: userTemplate.getId(),
                    templateName: userTemplate.getTemplateDate(),
                    nickname:matchedAffiliation.getNickname(),
                    type: "comment"
                    }
                }));
    }
    

    private makeLikeShapeAccordingToUserTemplate(userTemplate: UserTemplate[], userChallengeAndAffiliationData:UserChallenge, affiliation: Affiliation[]):GetLikeNotify[]{
        return userTemplate.flatMap((userTemplate) => userTemplate.likes.filter((like)=> like.getAffiliationId() !== userChallengeAndAffiliationData.affiliation.getId())
        .map((like) => {
            const matchedAffiliation = affiliation.find(affiliation => affiliation.getId() === like.getAffiliationId());
            return {
            likeId: like.getId(),
            createdAt: like.getCreatedAt(),
            sign: like.getCheck(),
            userTemplateId: userTemplate.getId(),
            templateName: userTemplate.getTemplateDate(),
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
        if (!await this.challengeApi.requestChallengeDayByChallengeIdAndDate(challengeId, new Date(date),false)) {
            complete = false;
        }  
        return complete; 
    }

    private sortAccorgindToUserTemplateId(userTemplates: TemplateContent[]):  TemplateContent[][]{
        const sortedUserTemplate : TemplateContent[][]= [];
        const uniqueUserTemplateIds = Array.from(new Set(userTemplates.map((q) => q.userTemplateId)));
        for (const userTemplateId of uniqueUserTemplateIds) {
            const filteredQuestions = userTemplates.filter((q) => q.userTemplateId === userTemplateId);
            sortedUserTemplate.push(filteredQuestions);
        }
        return sortedUserTemplate;
    }
}





