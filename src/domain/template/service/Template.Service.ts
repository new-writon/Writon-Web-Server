import {  Injectable } from '@nestjs/common';
import { TemplateContent } from '../dto/response/TemplateContent';
import { UserApi } from '../infrastructure/User.Api';
import { WriteTemplateContent } from '../dto/values/TemplateContent';
import { ChallengeApi } from '../infrastructure/Challenge.Api';
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
import { InsertUserTemplateContent } from '../dto/values/InsertUserTemplateContent';
import { QuestionContentHelper } from '../helper/QuestionContent.Helper';
import { TemplateVerifyService } from '../../../global/exception/template/TemplateVerify.Service';
import { MutexAlgorithm } from 'src/global/decorator/mutex';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';



@Injectable()
export class TemplateService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly userApi: UserApi,
        private readonly challengeApi: ChallengeApi,
        private readonly userTemplateHelper: UserTemplateHelper,
        private readonly dataMapperService: DataMapperService,
        private readonly questionContentHelper:QuestionContentHelper,
        private readonly templateVerifyService:TemplateVerifyService,
        private readonly userVerifyService:UserVerifyService
      ) {}


    public async bringTemplateContent(userId:number, userTemplateId:number, organization:string, visibility: boolean):Promise<TemplateContent[]>{
        const [affiliationData, userTemplateData] = await Promise.all([
            this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization),
            this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId, visibility)
        ]);
        return userTemplateData === null? []:this.proccessTemplateContent(userTemplateData, affiliationData);
    }

    private async proccessTemplateContent(userTemplateData:UserTemplate, affiliationData:Affiliation){
        const questionIds = this.dataMapperService.extractQuestionId(userTemplateData);
        const [questionData, userChallengeData]= await Promise.all([
            this.challengeApi.requestQuestionById(questionIds),
            this.userApi.requestUserChallengeAndAffiliationAndUserById(userTemplateData.getUserChallengeId())
        ]);    
        const mergedForOneTemplate = this.mergeForOneTemplate(affiliationData, userTemplateData, questionData, userChallengeData);
        const sortedCompanyData = sortCompanyPublic(mergedForOneTemplate) as TemplateContent[];
        return sortedCompanyData;
    }
    
    public async bringTemplateAccordingToDate(userId:number, organization:string, challengeId:number, date:Date):Promise<TemplateInformation | []>{
        const [affiliationData, userChallengeDatas] = await Promise.all([
            this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization),
            this.userApi.requestUserChallengeAndAffiliationAndUserByChallengeId(challengeId)
        ]);
        const userChallengeIds = this.extractUserChallengeId(userChallengeDatas);
        const userTemplateData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(userChallengeIds, date);
        return userTemplateData.length === 0 ? []:this.proccessTemplateAccordingToDateData(userTemplateData,affiliationData,userChallengeDatas)
    }

    private async proccessTemplateAccordingToDateData(userTemplateData:UserTemplate[], affiliationData:Affiliation, userChallengeDatas:UserChallenge[]){
        const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData);
        const questionData = await this.challengeApi.requestQuestionById(questionIds);
        const challengeCompleteCount = this.dataMapperService.extractCompleteCount(userTemplateData);
        const mergedForManyTemplates = this.mergeForAllManyTemplates(affiliationData, userTemplateData, questionData, userChallengeDatas);
        const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates); 
        return TemplateInformation.of(challengeCompleteCount, sortedCompanyData);
    }    

    private mergeForOneTemplate(affiliationData: Affiliation, userTemplateData: UserTemplate, questionDatas: Question[], userChallengeData:UserChallenge) {
        return questionDatas.map((questionData) => {
            const questionContent = userTemplateData.getQuestionContents().find(
                (content) => content.getQuestionId() === questionData.getId());
            const myLikeSign = userTemplateData.likes.some((like) => like.getAffiliationId() === affiliationData.getId()) ? '1' : '0';
            const userChallengeAfiliation = userChallengeData.getAffiliation();
            return TemplateContent.of(   
                userChallengeAfiliation,
                questionData.getId(),
                userTemplateData.getId(),
                questionContent,
                formatDate(userTemplateData.getCreatedAt().toString()),
                questionData,
                userTemplateData.getLikes().length.toString(),
                userTemplateData.getComments().length.toString(),
                myLikeSign
            )});
    }

    private mergeForAllManyTemplates(
        affiliationData: Affiliation, 
        userTemplateDatas: UserTemplate[], 
        questionDatas: Question[], 
        userChallengeDatas: UserChallenge[]
    ):TemplateContent[][]{
        return userTemplateDatas.map(userTemplateData => {
            return questionDatas.reduce((acc, questionData) => {
                const questionContent = userTemplateData.getQuestionContents().find((content) => content.getQuestionId() === questionData.getId());
                const userChallengeData = userChallengeDatas.find((content) => content.getId() === userTemplateData.getUserChallengeId());
                const myLikeSign = userTemplateData.likes.some((like) => like.getAffiliationId() === affiliationData.getId()) ? '1' : '0';
                if (questionContent && userChallengeData) {
                    const userChallengeAffiliation = userChallengeData.getAffiliation();
                    acc.push(TemplateContent.of(
                        userChallengeAffiliation,
                        questionData.getId(),
                        userTemplateData.getId(),
                        questionContent,
                        formatDate(userTemplateData.getCreatedAt().toString()),
                        questionData,
                        userTemplateData.getLikes().length.toString(),
                        userTemplateData.getComments().length.toString(),
                        myLikeSign
                    ));
                }
                return acc;
            }, []);
        });
    }
    

    private extractUserChallengeId(userChallenge:UserChallenge[]){
        return userChallenge.map((data)=> data.getId())
    }

    public async bringAllTemplateContent(userId: number, organization: string, challengeId:number):Promise<TemplateInformation | []>{
        const affiliationData = await this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization);
        // 검증하기
        const userChallengeData = await this.userApi.requestUserChallengeByAffiliationIdAndChallengeId(affiliationData.getId(), challengeId);
        this.userVerifyService.verifyUserChallenge(userChallengeData);
        const userTemplateData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(userChallengeData.getId());
        return userTemplateData.length === 0 ? []:this.proccessTemplateData(userTemplateData,affiliationData)
    }

    private async proccessTemplateData(userTemplateData:UserTemplate[], affiliationData:Affiliation){
        const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData);
        const questionData = await this.challengeApi.requestQuestionById(questionIds);
        const mergedForManyTemplates = this.mergeForMyManyTemplates(affiliationData, userTemplateData, questionData);
        const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates); 
        return TemplateInformation.of(undefined, sortedCompanyData);
    }


    private mergeForMyManyTemplates(affiliationData: Affiliation, userTemplateDatas: UserTemplate[], questionDatas: Question[]):TemplateContent[][] {
        return userTemplateDatas.map(userTemplateData => {
            return questionDatas.reduce((acc, questionData) => {
                const questionContent = userTemplateData.getQuestionContents().find((content) => content.getQuestionId() === questionData.getId());
                const myLikeSign = userTemplateData.likes.some((like) => like.getAffiliationId() === affiliationData.getId()) ? '1' : '0';
                if (questionContent) {
                    acc.push(TemplateContent.of(
                        affiliationData,
                        questionData.getId(),
                        userTemplateData.getId(),
                        questionContent,
                        formatDate(userTemplateData.getCreatedAt().toString()),
                        questionData,
                        userTemplateData.getLikes().length.toString(),
                        userTemplateData.getComments().length.toString(),
                        myLikeSign
                    ));
                }
                return acc;
            }, []);
        });
    }

    @MutexAlgorithm()
    @Transactional()
    public async penetrateTemplate(  
        userId: number,
        templateWrite: TemplateWrite): Promise<void>{
            const [userChallengeData, userTemplateComplete, questionDatas] = await Promise.all([
                // 검증하기
                this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(templateWrite.getChallengeId(), userId, templateWrite.getOrganization()),
                this.signUserChallengeComplete(templateWrite.getChallengeId(), templateWrite.getDate()),
                this.challengeApi.requestQuestionsByChallengeId(templateWrite.getChallengeId())
            ]);
            this.userVerifyService.verifyUserChallenge(userChallengeData);
            const questionIds = this.dataMapperService.extractQuestionIdFromQuetion(questionDatas);
            const templateWriteQuestionIds = this.extractTemplateWriteQuestionId(templateWrite);
            this.templateVerifyService.verifyQuestionId(this.checkQuestionContain(questionIds,templateWriteQuestionIds))
            const existingUserTemplateData = await this.userTemplateHelper.giveUserTemplateByUserChallengeIdAndDate(userChallengeData.getId(), templateWrite.getDate());
            this.templateVerifyService.verifyExistUserTemplate(existingUserTemplateData);
            const userTemplateData = await this.userTemplateHelper.exexuteInsertUserTemplate(userChallengeData.getId(), new Date(templateWrite.getDate()), userTemplateComplete);
            const changedTemplate = this.changeUserTemplateType(templateWrite.getTemplateContent(), userTemplateData.getId());
            await this.questionContentHelper.executeInsertQuestionContent(changedTemplate);
    } 

    private checkQuestionContain(relativeQuestion:number[], targetQuestion:number[]){
        return relativeQuestion.every(data => targetQuestion.includes(data));
    }

    private extractTemplateWriteQuestionId(templateWrite:TemplateWrite){
        return templateWrite.getTemplateContent().map((data)=>data.getQuestionId())
    }



    private changeUserTemplateType(writeTempletes: WriteTemplateContent[], userTempleteId: number):InsertUserTemplateContent[]{
        return writeTempletes.map(writeTemplete => InsertUserTemplateContent.of(
            writeTemplete.getQuestionId(),
            writeTemplete.getContent(),
            writeTemplete.getVisibility(),
            userTempleteId, 
        ));
    }

    @Transactional()
    public async modifyMyTemplate(
        userTemplateId:number,
        templateContent:Array<WriteTemplateContent>):Promise<void>{
            await this.questionContentHelper.executeDeleteQuestionContent(userTemplateId);
            const changedTemplate = this.changeUserTemplateType(templateContent, userTemplateId);
            await this.questionContentHelper.executeInsertQuestionContent(changedTemplate);
    }

    
    public async bringNotify(  
        userId: number,
        organization: string,
        challengeId: number): Promise<(GetCommentNotify | GetLikeNotify)[]>{
            const userChallengeAndAffiliationData = await this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId, userId, organization);
            const userTemplateAndCommentAndLikeData = await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeAndAffiliationData.getId());
            const hasNoData = 
                !userTemplateAndCommentAndLikeData || 
                userTemplateAndCommentAndLikeData.length === 0 || 
                !userTemplateAndCommentAndLikeData.some(item => item.comments && item.comments.length > 0) || 
                !userTemplateAndCommentAndLikeData.some(item => item.likes && item.likes.length > 0);
            return hasNoData ? [] : this.proccessNotifyData(userTemplateAndCommentAndLikeData, userChallengeAndAffiliationData);
    } 

    private async proccessNotifyData(userTemplateAndCommentAndLikeData:UserTemplate[], userChallengeAndAffiliationData:UserChallenge){
          const extractAffiliationId = this.extractAffiliationIdAccordingToCommentAndLike(userTemplateAndCommentAndLikeData);
          let [commentAffiliationData, likeAffiliationData] = await Promise.all([
              this.userApi.requestAffiliationById(extractAffiliationId.commentAffiliationIds),
              this.userApi.requestAffiliationById(extractAffiliationId.likeAffiliationIds)
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
      
    private async signUserChallengeComplete (challengeId: number, date: string){
        let complete = true;
        if (new Date(date).setHours(0, 0, 0, 0).toLocaleString() !== new Date().setHours(0, 0, 0, 0).toLocaleString()) {
            complete = false;
        } 
        if (!await this.challengeApi.requestChallengeDayByChallengeIdAndDate(challengeId, date)) {
            complete = false;
        }  
        return complete; 
    }

}





