import { Body, Controller, HttpCode, Logger, Patch, Post, UseGuards } from "@nestjs/common";
import { ResponseService } from "../service/Response.Service";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator";
import { User } from "../../user/domain/entity/User";
import { ReEngagementCheck } from "../dto/request/ReEngagementCheck";
import { ObjectiveQuestionAnswer } from "../dto/request/ObjectiveQuestionAnswer";
import { SubjectiveQuestionAnswer } from "../dto/request/SubjectiveQuestionAnswer";

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
    await this.responseService.checkReEngagement(user.userId, reEngagementCheck.getOrganization(), reEngagementCheck.getChallengeId(), reEngagementCheck.getCheck());
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
    await this.responseService.penetrateObjectiveQuestion(user.userId, objectiveQuestionAnswer.getOrganization(), objectiveQuestionAnswer.getChallengeId(), objectiveQuestionAnswer.getSatisfactionAnswer())
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
    await this.responseService.penetrateSubjectiveQuestion(user.userId, subjectiveQuestionAnswer.getOrganization(), subjectiveQuestionAnswer.getChallengeId(), subjectiveQuestionAnswer.getSatisfactionAnswer())
    this.logger.log("주관식 질문 응답 완료")
    return SuccessResponseDto.of();
  }
}