import { Body, Controller, HttpCode, Logger, Patch, Post, UseGuards } from "@nestjs/common";
import { ResponseService } from "../service/Response.Service.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { ReEngagementCheck } from "../dto/request/ReEngagementCheck.js";
import { ObjectiveQuestionAnswer } from "../dto/request/ObjectiveQuestionAnswer.js";
import { SubjectiveQuestionAnswer } from "../dto/request/SubjectiveQuestionAnswer.js";

@Controller('/api/satisfaction/response')
export class ResponseController{
    private readonly logger = new Logger(ResponseController.name);
    constructor(
        private readonly responseService: ResponseService
    ){}



  @Patch("/re-engagement")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async checkReEngagement(
    @Body() reEngagementCheck: ReEngagementCheck,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<void>>  {
    await this.responseService.checkReEngagement(user.user_id, reEngagementCheck.getOrganization(), reEngagementCheck.getChallengeId(), reEngagementCheck.getCheck());
    this.logger.log("재참여 여부 응답 완료")
    return SuccessResponseDto.of();
  }


  @Post("/objective-question")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async penetrateObjectiveQuestion(
    @Body() objectiveQuestionAnswer:ObjectiveQuestionAnswer,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<void>>{
    await this.responseService.penetrateObjectiveQuestion(user.user_id, objectiveQuestionAnswer.getOrganization(), objectiveQuestionAnswer.getChallengeId(), objectiveQuestionAnswer.getSatisfactionAnswer())
    this.logger.log("객관식 질문 응답 완료")
    return SuccessResponseDto.of();
  }

  @Post("/subjective-question")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async penetrateSubjectiveQuestion(
    @Body() subjectiveQuestionAnswer:SubjectiveQuestionAnswer,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<void>>  {
    await this.responseService.penetrateSubjectiveQuestion(user.user_id, subjectiveQuestionAnswer.getOrganization(), subjectiveQuestionAnswer.getChallengeId(), subjectiveQuestionAnswer.getSatisfactionAnswer())
    this.logger.log("주관식 질문 응답 완료")
    return SuccessResponseDto.of();
  }
}