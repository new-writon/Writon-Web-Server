import { Inject, Injectable } from "@nestjs/common";
import { UserChallenge } from "../domain/entity/UserChallenge";
import { UserChallengeRepository } from "../domain/repository/UserChallenge.Repository";

@Injectable()
export class UserChallengeHelper{

    constructor(
        @Inject('userchallengeImpl')
        private readonly userChallengeRepository: UserChallengeRepository,

    ){}

    public async giveUserChallengeByUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId: number){
        return this.userChallengeRepository.findUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId);
    }


}