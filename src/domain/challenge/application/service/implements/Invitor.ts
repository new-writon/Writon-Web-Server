import { Injectable } from '@nestjs/common';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { ChallengeInvite } from 'src/domain/challenge/dto/request/ChallengeInvite';
import { ChallengeOperation } from '../types/Operation';
import { ChallengeHelper } from '../../helper/Challenge.Helper';
import { MailManager } from 'src/global/util/MailManager';

@Injectable()
export class Invitor implements ChallengeUseCase<[ChallengeInvite], Promise<void>> {
  operation: ChallengeOperation = 'SEND_INVITATION';

  constructor(
    private readonly challengeHelper: ChallengeHelper,
    private readonly mailManager: MailManager,
  ) {}
  async handle(request: [ChallengeInvite]): Promise<void> {
    const [challengeInvite] = request;
    const challengeData = await this.challengeHelper.giveChallengeByChallengeName(
      challengeInvite.getChallenge(),
    );
    await Promise.all(
      challengeInvite.getEmail().map(async (e) => {
        await this.mailManager.sendInvitationEmail(
          challengeInvite.getOrganization(),
          challengeData.challengeId,
          e,
          challengeInvite.getChallenge(),
        );
      }),
    );
  }
}
