import { Injectable } from "@nestjs/common";
import { Affiliation } from "../../../domain/user/domain/entity/Affiliation";
import { AffiliationHelper } from "../../../domain/user/helper/Affiliation.Helper";
import { UserHelper } from "../../user/helper/User.Helper";
import { UserChallengeHelper } from "../../../domain/user/helper/UserChallenge.Helper";

@Injectable()
export class UserApi{

    constructor(
        private readonly userHelper: UserHelper,
        private readonly affiliationHelper: AffiliationHelper,
        private readonly userChallengeHelper: UserChallengeHelper
    ){}

    public async requestUserDataBySocialNumberOrIdentifier(idenfitier: string, verifyFlag:boolean){
        return this.userHelper.giveUserDataBySocialNumberOrIdentifier(idenfitier, verifyFlag);
    }

    public async requestLocalSignUp(identifier: string, password: string, email: string){
        return this.userHelper.executeLocalSignUp(identifier, password, email);
    }

    public async requestUserByEmail(email: string, verifyFlag:boolean){
        return this.userHelper.giveUserByEmail(email, verifyFlag);
    }

    public async requestUpdatePassword(idenfitier: string, email:string, password:string){
        return  this.userHelper.executeUpdatePassword(idenfitier, email, password);

    }
  
    public async giveUserById(userId: number, verifyFlag:boolean){
        return this.userHelper.giveUserById(userId,verifyFlag);
    }

    public async executeUpdatePasswordByUserId(userId: number, password: string){
        return this.userHelper.executeUpdatePasswordByUserId(userId, password);
    }

    public async executeKakaoSignUp(email: string, kakaoId: string, profileImage: string){
        return this.userHelper.executeKakaoSignUp(email, kakaoId, profileImage);
    }

    public async requestAffiliationByUserIdAndOrganization(userId: number, organization: string, verifyFlag:boolean): Promise<Affiliation>{
        return this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization,verifyFlag);
    }

    public async requestAffiliationByNicknameAndOrganization(nickname:string, organization: string, verifyFlag:boolean): Promise<Affiliation>{
        return this.affiliationHelper.giveAffiliationByNicknameAndOrganization(nickname, organization, verifyFlag);
    }
 
    public async requestUserChallengeByUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId: number, verifyFlag:boolean){
        return this.userChallengeHelper.giveUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId,verifyFlag);
    }
}