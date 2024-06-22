import { Injectable } from "@nestjs/common";
import { UserHelper } from "../helper/User.Helper.js";
import { TemplateApi } from "../infrastruture/Template.Api.js";
import { UserChallengeHelper } from "../helper/UserChallenge.Helper.js";
import { ChallengeApi } from "../infrastruture/Challenge.Api.js";
import { UserVerifyService } from "../domain/service/UserVerify.Service.js";
import { AffiliationHelper } from "../helper/Affiliation.Helper.js";
import { Participant } from "../dto/response/Participant.js";
import { ParticipantComponent } from "../dto/response/ParticipantComponent.js";
import { isSameDate } from "../util/checker.js";

@Injectable()
export class CheeringPhraseService{

    constructor(
        private readonly affiliationHelper: AffiliationHelper,
        private readonly userChallengeHelper: UserChallengeHelper,
        private readonly challengeApi: ChallengeApi,
        private readonly userVerifyService: UserVerifyService 
    ) {}



    public async bringMyInformation(userId:number, challengeId:number): Promise<Participant>{
        const myInformationData = await this.affiliationHelper.giveAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(userId, challengeId);
        const sortedMyInformationData = this.sortCheeringAndPublic(new Array(myInformationData))
        return sortedMyInformationData[0]; 
    }

    public async bringParticipantInformation(userId:number, challengeId:number): Promise<ParticipantComponent>{
        const [participantData, participantCount, challengePeriod] = await Promise.all([
            this.affiliationHelper.giveAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(userId, challengeId),
            this.userChallengeHelper.giveUserChallengePaticipantCount(challengeId),
            this.challengeApi.requestOverlapPeriod(challengeId)
        ]);
        return ParticipantComponent.of(challengePeriod, participantCount, participantData);
    }

    public async insertCheeringPhrase(userId: number, organization: string, challengeId: number, content: string){
        const affiliationData = await this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization);
        await this.userChallengeHelper.executeInsertCheeringPhrase(affiliationData.getAffiliationId(), challengeId, content);
    }

    private sortCheeringAndPublic(data: Participant[]): Participant[]{
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return data.map((user) => {
            if (!user.getCheeringPhraseDate() || !isSameDate(new Date(user.getCheeringPhraseDate()), currentDate)) {
                user.changeCheeringPhrase(null)
            } 
            if (user.getCompanyPublic() === 0) {
                user.changeCompany(null)
            }
            return user;
        });
    }
}