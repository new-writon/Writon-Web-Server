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
import { User } from '../../user/domain/entity/User';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator';
import { SmallTalkService } from '../service/SmallTalk.Service';
import { SmallTalkResult } from '../dto/response/SmallTalkAddResult';
import { SmallTalkAdd } from '../dto/request/SmallTalkAdd';

@Controller('/api/small-talk')
export class SmallTalkController {
  private readonly logger = new Logger(SmallTalkController.name);
  constructor(private readonly smallTalkService: SmallTalkService) {}

  @Get('/:challengeId/:date')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringSmallTalk(
    @Param('challengeId') challengeId: number,
    @Param('date') date: string,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<any>> {
    const result = await this.smallTalkService.bringSmallTalk(
      user.userId,
      challengeId,
      date,
    );
    this.logger.log('스몰톡 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/check/:challengeId/:date')
  @HttpCode(200)
  public async checkSmallTalk(
    @Param('challengeId') challengeId: number,
    @Param('date') date: string,
  ): Promise<SuccessResponseDto<SmallTalkResult>> {
    const result = await this.smallTalkService.checkSmallTalk(
      challengeId,
      date,
    );
    this.logger.log('아고라 추가 여부 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Post()
  @HttpCode(200)
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async penetrateSmallTalk(
    @Body() smallTalkAdd: SmallTalkAdd,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<void>> {
    await this.smallTalkService.penetrateSmallTalk(
      user.userId,
      smallTalkAdd.getChallengeId(),
      smallTalkAdd.getOrganization(),
      smallTalkAdd.getAgoraQuestion(),
    );
    this.logger.log('스몰톡 추가 완료');
    return SuccessResponseDto.of();
  }
}
