import { Injectable } from "@nestjs/common";
import { UserApi } from "../infrastructure/User.Api";
import { ObjectiveAnswer } from "../dto/values/ObjectiveAnswer";
import { ObjectiveAnswerType } from "../dto/values/ObjectiveAnswerType";
import { SatisfactionObjectiveResultHelper } from "../helper/SatisfactionObjectiveResult.Helper";
import { SubjectiveAnswer } from "../dto/values/SubjectiveAnswer";
import { SubjectiveAnswerType } from "../dto/values/SubjectiveAnswerType";
import { SatisfactionSubjectiveResultHelper } from "../helper/SatisfactionSubjectiveResult.Helper";


@Injectable()
export class ResponseService{

    constructor(
        private readonly userApi: UserApi,
        private readonly satisfactionObjectiveHelper:SatisfactionObjectiveResultHelper,
        private readonly satisfactionSubjectiveHelper:SatisfactionSubjectiveResultHelper
    ){}

    public async checkReEngagement(userId:number,  organization:string, challengeId:number, check:boolean){
            // 검증 x
        await this.userApi.requestUpdateUserChallengeReEngagement(userId,organization, challengeId, check);
    }


    public async penetrateObjectiveQuestion(userId:number,  organization:string, challengeId:number, satisfactionAnswer: Array<ObjectiveAnswer>){
            // 검증 x
        const userChallengeData = await this.userApi.requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        const convertedObjectiveAnswer = this.convertObjectiveAnswerType(satisfactionAnswer, userChallengeData.getId());
        await this.satisfactionObjectiveHelper.executeInsertSatisfactionObjectiveResult(convertedObjectiveAnswer);
    }


    public async penetrateSubjectiveQuestion(userId:number,  organization:string, challengeId:number, satisfactionAnswer: Array<SubjectiveAnswer>){
            // 검증 x
        const userChallengeData = await this.userApi.requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        const convertedSubjectiveAnswer = this.convertSubjectiveAnswerType(satisfactionAnswer, userChallengeData.getId());
        await this.satisfactionSubjectiveHelper.executeInsertSatisfactionSubjectiveResult(convertedSubjectiveAnswer);
    }


    private convertObjectiveAnswerType(
        satisfationAnswer: Array<ObjectiveAnswer>,
        userChallengeId: number): ObjectiveAnswerType[]{
        return satisfationAnswer.map((answer) => new ObjectiveAnswerType(
            answer.getSatisfactionId(),
            answer.getScore(),
            userChallengeId
        ));
    }

    private convertSubjectiveAnswerType(
    satisfationAnswer: Array<SubjectiveAnswer>,
    userChallengeId: number
    ){
    return satisfationAnswer.map((answer) => new SubjectiveAnswerType(
        answer.getSatisfactionId(),
        answer.getAnswer(),
        userChallengeId
    ));
  }
    
}