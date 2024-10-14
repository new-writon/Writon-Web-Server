import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard';
import { User } from '../domain/entity/User';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator';
import { Participant } from '../dto/response/Participant';
import { ParticipantComponent } from '../dto/response/ParticipantComponent';
import { CheeringPhraseService } from '../service/CheeringPhrase.Service';
import { CheeringPhraseInsert } from '../dto/request/CheeringPhraseInsert';

@Controller('/api/user/cheering-phrase')
export class CheeringPhraseController {
  private readonly logger = new Logger(CheeringPhraseController.name);
  constructor(private readonly cheeringPhraseService: CheeringPhraseService) {}

  @Get('/:challengeId/my-information')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringParticipant(
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<Participant>> {
    const result = await this.cheeringPhraseService.bringParticipant(
      user.userId,
      challengeId,
    );
    this.logger.log('나의 정보 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/:challengeId/participant-information')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringParticipantComponent(
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<ParticipantComponent>> {
    const result = await this.cheeringPhraseService.bringParticipantComponent(
      user.userId,
      challengeId,
    );
    this.logger.log('챌린지 참여자 정보 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Post()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async penetrateCheeringPhrase(
    @Body() cheeringPhraseInsert: CheeringPhraseInsert,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<void>> {
    await this.cheeringPhraseService.penetrateCheeringPhrase(
      user.userId,
      cheeringPhraseInsert.getOrganization(),
      cheeringPhraseInsert.getChallengeId(),
      cheeringPhraseInsert.getContent(),
    );
    this.logger.log('오늘의 한마디 추가 완료');
    return SuccessResponseDto.of();
  }
}
