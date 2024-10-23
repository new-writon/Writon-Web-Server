import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto';
import { ChallengeInvite } from '../dto/request/ChallengeInvite';
import { ChallengeInviteService } from '../service/ChallengeInvite.Service';

@Controller('/api/challenge/invite')
export class ChallengeInviteController {
  private readonly logger = new Logger(ChallengeInviteController.name);
  constructor(
    private readonly challengeInviteService: ChallengeInviteService,
  ) {}

  @Post()
  @HttpCode(200)
  public async sendInvitation(
    @Body() challengeInvite: ChallengeInvite,
  ): Promise<SuccessResponseDto<void>> {
    await this.challengeInviteService.sendInvitation(
      challengeInvite.getOrganization(),
      challengeInvite.getChallenge(),
      challengeInvite.getEmail(),
    );
    this.logger.log('초대장 보내기 완료');
    return SuccessResponseDto.of();
  }
}
