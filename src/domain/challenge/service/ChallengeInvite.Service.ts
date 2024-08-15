import { Inject, Injectable } from "@nestjs/common";
import { MailManager } from "../../../global/util/MailManager.js";
import { ChallengeHelper } from "../helper/Challenge.Helper.js";

@Injectable()
export class ChallengeInviteService{

    constructor(
        private readonly challengeHelper: ChallengeHelper,
        private readonly mailManager:MailManager
    ){}



    public async sendInvitation(organization:string, challenge:string, email:string[]){ 
        const challengeData = await this.challengeHelper.giveChallengeByChallengeName(challenge);
        await Promise.all(
            email.map(async (e) => {
              await this.mailManager.sendInvitationEmail(organization, challengeData.challengeId, e, challenge);
            })
          );    
    }

}