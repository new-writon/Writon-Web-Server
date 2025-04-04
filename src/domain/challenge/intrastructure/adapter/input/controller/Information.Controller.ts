import { Controller, Get, HttpCode, Logger, Param } from '@nestjs/common';
import { InformationInputPort } from 'src/domain/challenge/application/port/input/InformationInputPort';
import { ChallengeAccordingToOrganization } from 'src/domain/challenge/dto/response/ChallengeAccordingToOrganization';
import { ChallengeStatus } from 'src/domain/challenge/dto/response/ChallengeStatus';
import { SuccessResponseDto } from 'src/global/response/SuccessResponseDto';

@Controller('/api/challenge/information')
export class InformationController {
  private readonly logger = new Logger(InformationController.name);
  constructor(private readonly informationInputPort: InformationInputPort) {}

  @Get('/all-organization/all-challenge')
  @HttpCode(200)
  public async bringChallengeAccordingToOrganization() {
    const result = await this.informationInputPort.execute<
      void,
      ChallengeAccordingToOrganization[]
    >('SELECT_ALL_CHALLENGE');
    this.logger.log('모든 조직의 챌린지 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/:challengeId/status')
  @HttpCode(200)
  public async bringChallengeStatus(
    @Param('challengeId') challengeId: number,
  ): Promise<SuccessResponseDto<ChallengeStatus>> {
    const result = await this.informationInputPort.execute<[number], ChallengeStatus>(
      'SELECT_CHALLENGE_STATUS',
      challengeId,
    );
    this.logger.log('챌린지 종료 확인 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/:challengeId')
  @HttpCode(200)
  public async bringChallengeDay(
    @Param('challengeId') challengeId: number,
  ): Promise<SuccessResponseDto<string[]>> {
    const result = await this.informationInputPort.execute<[number], string[]>(
      'SELECT_CHALLENGE_DATE',
      challengeId,
    );
    this.logger.log('챌린지 수행 날짜 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/:challengeId/:date')
  @HttpCode(200)
  public async checkChallengeDay(
    @Param('challengeId') challengeId: number,
    @Param('date') date: string,
  ): Promise<SuccessResponseDto<void>> {
    await this.informationInputPort.execute('CHECK_CHALLENGE_DAY', challengeId, date);
    this.logger.log('챌린지 수행 날짜 여부 조회 완료');
    return SuccessResponseDto.of();
  }
}
