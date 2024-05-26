import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository.js";
import { MailManager } from "../../../global/util/MailManager.js";

@Injectable()
export class ChallengeInviteService{

    constructor(
        @Inject('challengeImpl')
        private readonly challengeRepository: ChallengeRepository,
        private readonly mailManager:MailManager
    ){}



    public async sendInvitation(organization:string, challenge:string, email:string[]){ 
        const challengeData = await this.challengeRepository.findChallengeByChallengeName(challenge);
        await Promise.all(
            email.map(async (e) => {
              await this.mailManager.sendInvitationEmail(organization, challengeData.challenge_id, e, challenge);
            })
          );    
    }

}