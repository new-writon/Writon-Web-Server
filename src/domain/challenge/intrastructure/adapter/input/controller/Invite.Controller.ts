import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { InviteInputPort } from 'src/domain/challenge/application/port/input/InviteInputPort';
import { ChallengeInvite } from 'src/domain/challenge/dto/request/ChallengeInvite';
import { SuccessResponseDto } from 'src/global/response/SuccessResponseDto';

@Controller('/api/challenge/invite')
export class InviteController {
  private readonly logger = new Logger(InviteController.name);
  constructor(private readonly inviteInputPort: InviteInputPort) {}

  @Post()
  @HttpCode(200)
  public async sendInvitation(
    @Body() challengeInvite: ChallengeInvite,
  ): Promise<SuccessResponseDto<void>> {
    await this.inviteInputPort.execute('SEND_INVITATION', challengeInvite);
    this.logger.log('초대장 보내기 완료');
    return SuccessResponseDto.of();
  }
}
