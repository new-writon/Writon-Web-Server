import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../../../../auth/decorators/Auth.Decorator';
import { User } from '../../../../../user/domain/entity/User';
import { SuccessResponseDto } from '../../../../../../global/response/SuccessResponseDto';
import { TemplateContent } from '../../../../dto/response/TemplateContent';
import { TemplateWrite } from '../../../../dto/request/TemplateWrite';
import { TemplateUpdate } from '../../../../dto/request/TemplateUpdate';
import { TemplateInputPort } from 'src/domain/template/application/port/input/TemplateInputPort';
import { TemplateInformation } from 'src/domain/template/dto/response/TemplateInformation';
import { JWTAuthGuard } from 'src/domain/auth/guards/JwtAuth.Guard';

@Controller('/api/template/root')
export class TemplateController {
  private readonly logger = new Logger(TemplateController.name);
  constructor(private readonly templateService: TemplateInputPort) {}

  @Put('/update')
  @HttpCode(200)
  public async modifyMyTemplate(
    @Body() templateUpdate: TemplateUpdate,
  ): Promise<SuccessResponseDto<void>> {
    await this.templateService.execute('UPDATE_TEMPLATE', templateUpdate);
    this.logger.log('템플릿 수정 완료');
    return SuccessResponseDto.of();
  }

  @Get('/:organization/:challengeId/date/:date')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringTemplateAccordingToDate(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @Param('date') date: Date,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<TemplateInformation | []>> {
    const result = await this.templateService.execute<
      [number, string, number, Date],
      TemplateInformation | []
    >('SELECT_TEMPLATE_BY_DATE', user.userId, organization, challengeId, date);
    this.logger.log('날짜별 템플릿 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/:organization/:userTemplateId/visibility/:visibility')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringTemplateContent(
    @Param('organization') organization: string,
    @Param('userTemplateId') userTemplateId: number,
    @Param('visibility') visibility: boolean,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<TemplateContent[]>> {
    const result = await this.templateService.execute<
      [number, string, boolean, number],
      TemplateContent[]
    >('SELECT_SINGLE_TEMPLATE', userTemplateId, organization, visibility, user.userId);
    this.logger.log('템플릿 하나 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/reminiscence/:organization/:challengeId')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringAllTemplateContent(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<TemplateInformation | []>> {
    const result = await this.templateService.execute<
      [number, string, number],
      TemplateInformation | []
    >('SELECT_MY_TEMPLATE', user.userId, organization, challengeId);
    this.logger.log('내 챌린지 템플릿 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Post('/write')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async penetrateTemplate(
    @Body() templateWrite: TemplateWrite,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<void>> {
    await this.templateService.execute('INSERT_TEMPLATE', templateWrite, user.userId);
    this.logger.log('템플릿 작성 완료');
    return SuccessResponseDto.of();
  }

  @Get('/:organization/:challengeId/notify')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringNotify(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<(GetCommentNotify | GetLikeNotify)[]>> {
    // const result = await this.templateService.bringNotify(user.userId, organization, challengeId);
    const result = await this.templateService.execute<
      [number, string, number],
      (GetCommentNotify | GetLikeNotify)[]
    >('SEND_NOTIFY', user.userId, organization, challengeId);
    this.logger.log('챌린지에 따른 알림 조회 완료');
    return SuccessResponseDto.of(result);
  }
}
