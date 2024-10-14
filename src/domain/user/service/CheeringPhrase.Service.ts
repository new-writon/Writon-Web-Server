import { Injectable } from '@nestjs/common';
import { UserChallengeHelper } from '../helper/UserChallenge.Helper';
import { ChallengeApi } from '../infrastruture/Challenge.Api';
import { AffiliationHelper } from '../helper/Affiliation.Helper';
import { Participant } from '../dto/response/Participant';
import { ParticipantComponent } from '../dto/response/ParticipantComponent';
import { isSameDate } from '../util/checker';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';

@Injectable()
export class CheeringPhraseService {
  constructor(
    private readonly affiliationHelper: AffiliationHelper,
    private readonly userChallengeHelper: UserChallengeHelper,
    private readonly challengeApi: ChallengeApi,
    private readonly userVerifyService: UserVerifyService,
  ) {}

  public async bringParticipant(
    userId: number,
    challengeId: number,
  ): Promise<Participant> {
    const myInformationData =
      await this.affiliationHelper.giveAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(
        userId,
        challengeId,
      );
    const sortedMyInformationData = this.sortCheeringAndPublic(
      new Array(myInformationData),
    );
    return sortedMyInformationData[0];
  }

  public async bringParticipantComponent(
    userId: number,
    challengeId: number,
  ): Promise<ParticipantComponent> {
    const [participantData, participantCount, challengePeriod] =
      await Promise.all([
        this.affiliationHelper.giveAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(
          userId,
          challengeId,
        ),
        this.userChallengeHelper.giveUserChallengePaticipantCount(challengeId),
        this.challengeApi.requestOverlapPeriod(challengeId),
      ]);
    return ParticipantComponent.of(
      challengePeriod,
      participantCount,
      participantData,
    );
  }

  public async penetrateCheeringPhrase(
    userId: number,
    organization: string,
    challengeId: number,
    content: string,
  ) {
    // 검증하기
    const affiliationData =
      await this.affiliationHelper.giveAffiliationByUserIdWithOrganization(
        userId,
        organization,
      );
    this.userVerifyService.verifyAffiliation(affiliationData);
    await this.userChallengeHelper.executeInsertCheeringPhrase(
      affiliationData.getAffiliationId(),
      challengeId,
      content,
    );
  }

  private sortCheeringAndPublic(data: Participant[]): Participant[] {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return data.map((user) => {
      if (
        !user.getCheeringPhraseDate() ||
        !isSameDate(new Date(user.getCheeringPhraseDate()), currentDate)
      ) {
        user.changeCheeringPhrase(null);
      }
      if (user.getCompanyPublic() === 0) {
        user.changeCompany(null);
      }
      return user;
    });
  }
}
