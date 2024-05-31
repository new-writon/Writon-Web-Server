import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TemplateService } from '../service/Template.Service.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { User } from '../../user/domain/entity/User.js';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { JWTAuthGuard } from '../../../domain/auth/guards/JwtAuth.Guard.js';
import { TemplateContent } from '../dto/response/TemplateContent.js';
import { TemplateWrite } from '../dto/request/TemplateWrite.js';


@Controller("/api/template")
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

 


  @Get("/reminiscence/:organization/:challengeId")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringMyTemplate(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<TemplateContent[][]>>  {
    const result = await this.templateService.bringMyTemplate(user.user_id, organization, challengeId);
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
    return SuccessResponseDto.of();
  }

  @Get("/:organization/:challengeId/notify")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringNotify(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<any>>  {

    const result = await this.templateService.bringNotify(user.user_id, organization, challengeId);
    return SuccessResponseDto.of();
  }


}