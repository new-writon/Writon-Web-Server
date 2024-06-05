import { Body, Controller, Get, HttpCode, Logger, Param, Post, Put,  UseGuards } from '@nestjs/common';
import { TemplateService } from '../service/Template.Service.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { User } from '../../user/domain/entity/User.js';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { JWTAuthGuard } from '../../../domain/auth/guards/JwtAuth.Guard.js';
import { TemplateContent } from '../dto/response/TemplateContent.js';
import { TemplateWrite } from '../dto/request/TemplateWrite.js';
import { TemplateUpdate } from '../dto/request/TemplateUpdate.js';



@Controller("/api/template")
export class TemplateController {
  private readonly logger = new Logger(TemplateController.name);
  constructor(private readonly templateService: TemplateService) {}


  @Put("/update")
  @HttpCode(200)
  public async updateMyTemplate(
    @Body() templateUpdate: TemplateUpdate,
  ): Promise<SuccessResponseDto<void>>  {
    await this.templateService.updateMyTemplate(templateUpdate.getUserTemplateId(), templateUpdate.getTemplateContent())
    this.logger.log("템플릿 수정 완료");
    return SuccessResponseDto.of();
  }


  @Get("/reminiscence/:organization/:challengeId")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringMyTemplate(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<TemplateContent[][]>>  {
    const result = await this.templateService.bringMyTemplate(user.user_id, organization, challengeId);
    this.logger.log("유저 만족도 조사 참여 여부 조회 완료");
    return SuccessResponseDto.of(result);
  }

  @Post("/write")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async writeTemplate(
    @Body() templateWrite: TemplateWrite,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<void>>  {
    await this.templateService.writeTemplate(user.user_id,templateWrite.getChallengeId(), templateWrite.getOrganization(), templateWrite.getDate(), templateWrite.getTemplateContent());
    this.logger.log("템플릿 작성 완료");
    return SuccessResponseDto.of();
  }

  @Get("/:organization/:challengeId/notify")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringNotify(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<(GetCommentNotify | GetLikeNotify)[]>>  {
    const result = await this.templateService.bringNotify(user.user_id, organization, challengeId);
    this.logger.log("챌린지에 따른 알림 조회 완료");
    return SuccessResponseDto.of(result);
  }


}