import { Inject, Injectable } from "@nestjs/common";
import { UserTemplateRepository } from "../domain/repository/UserTemplate.Repository";
import { UserTemplate } from "../domain/entity/UserTemplate";
import { TemplateVerifyService } from "../../../global/exception/template/TemplateVerify.Service";

@Injectable()
export class UserTemplateHelper{


    constructor(
        @Inject('usertemplateImpl')
        private readonly userTemplateRepository: UserTemplateRepository,
    ){}

    public async giveUserTemplateByUserChallengeId(userChallengeId: number): Promise<UserTemplate[]>{
        return this.userTemplateRepository.findUserTemplateByUserChallengeId(userChallengeId);
    };

    public async giveChallengeSuccessChallengeCount(userChallengeId:number): Promise<number>{
        return this.userTemplateRepository.findChallengeSuccessChallengeCount(userChallengeId);
    };


    public async exexuteInsertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplate>{
        return this.userTemplateRepository.insertUserTemplate(userChallnegeId, date, complete);
    }

    public async giveUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number):Promise<UserTemplate[]>{
       return  this.userTemplateRepository.findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId);
    }

    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(userChallengeId:number[], date:Date):Promise<UserTemplate[]>{
        return this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(userChallengeId, date);
    }

    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(userChallengeId:number):Promise<UserTemplate[]>{
        return this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(userChallengeId);
    }



    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId:number, visibility:boolean):Promise<UserTemplate>{
        return this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId, visibility);  
    }

    public async giveUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]){
        return this.userTemplateRepository.findUserTemplateSuccessCountByUserChallengeIds(userChallengeIds);
    }

    public async giveUserTemplateByUserChallengeIdAndDate(userChallengeId: number, date:string){
        return this.userTemplateRepository.findUserTemplateByUserChallengeIdAndDate(userChallengeId,date);
    }

    public async findUserTemplateById(userTemplateId:number):Promise<UserTemplate>{
        return this.userTemplateRepository.findUserTemplateById(userTemplateId);
    }

}