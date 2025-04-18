import { Controller, Get, HttpCode, Logger, Param, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/domain/auth/decorators/Auth.Decorator';
import { JWTAuthGuard } from 'src/domain/auth/guards/JwtAuth.Guard';
import { QuestionInputPort } from 'src/domain/challenge/application/port/input/QuestionInputPort';
import { BasicQuestion } from 'src/domain/challenge/dto/response/BasicQuestion';
import { SpecialQuestion } from 'src/domain/challenge/dto/response/SpecialQuestion';
import { User } from 'src/domain/user/domain/entity/User';
import { SuccessResponseDto } from 'src/global/response/SuccessResponseDto';

@Controller('/api/challenge/question')
export class QuestionController {
  private readonly logger = new Logger(QuestionController.name);
  constructor(private readonly questionInputPort: QuestionInputPort) {}

  @Get('/default')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringDefaultQuestion(@CurrentUser() user: User) {
    const result = await this.questionInputPort.execute('SELECT_DEFAULT_QUESTION', user.userId);
    this.logger.log('디폴트 질문 조회 완료');
    return SuccessResponseDto.of();
  }

  @Get('/:challengeId/basic-question')
  @HttpCode(200)
  public async bringBasicQuestion(
    @Param('challengeId') challengeId: number,
  ): Promise<SuccessResponseDto<BasicQuestion[]>> {
    const result = await this.questionInputPort.execute<[number], BasicQuestion[]>(
      'SELECT_BASIC_QUESTION',
      challengeId,
    );
    this.logger.log('베이직 질문 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/:challengeId/special-question')
  @HttpCode(200)
  public async bringSpecialQuestion(
    @Param('challengeId') challengeId: number,
  ): Promise<SuccessResponseDto<SpecialQuestion[]>> {
    const result = await this.questionInputPort.execute<[number], SpecialQuestion[]>(
      'SELECT_SPECIAL_QUESTION',
      challengeId,
    );
    this.logger.log('스페셜 질문 조회 완료');
    return SuccessResponseDto.of(result);
  }
}
