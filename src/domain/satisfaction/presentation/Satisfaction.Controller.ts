import { Controller, Get, HttpCode, Logger, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { SatisfactionService } from "../service/Satisfaction.Service.js";
import { SatisfactionStatus } from "../dto/response/SatisfactionSatus.js";
import { Restart } from "../dto/response/Restart.js";
import { UserChallengeResult } from "../dto/response/UserChallengeResult.js";
import { SatisfactionQuestion } from "../dto/response/SatisfactionQuestion.js";

@Controller('/api/satisfaction')
export class SatisfactionController{
  private readonly logger = new Logger( SatisfactionController.name);
  constructor(
      private readonly satisfactionService: SatisfactionService
  ){}

  @Get("/question/:challengeId")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringSatisfactionQuestion(
    @Param('challengeId') challengeId: number
  ): Promise<SuccessResponseDto<SatisfactionQuestion[]>>  {
    const result = await this.satisfactionService.bringSatisfactionQuestion(challengeId);
    this.logger.log("챌린지 만족도 조사 질문 조회 완료");
    return SuccessResponseDto.of(result);
  }


  @Get("/re-engagement/:challengeId")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringReEngagement(
    @Param('challengeId') challengeId: number
  ): Promise<SuccessResponseDto<Restart>>  {
    const result = await this.satisfactionService.bringReEngagement(challengeId);
    this.logger.log("유저의 챌린지 재참여 여부 조회 완료");
    return SuccessResponseDto.of(result);
  }

  @Get("/result/:organization/:challengeId")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringUserChallengeResult(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number, 
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<UserChallengeResult>>  {
    const result = await this.satisfactionService.bringUserChallengeResult(user.userId, organization, challengeId);
    this.logger.log("유저가 진행한 챌린지 결과 조회 완료");
    return SuccessResponseDto.of(result);
  }


  @Get("/:organization/:challengeId")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringSatisfactionStatus(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number, 
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<SatisfactionStatus>>  {
    const result = await this.satisfactionService.bringSatisfactionStatus(user.userId, organization, challengeId);
    this.logger.log("유저 만족도 조사 참여 여부 조회 완료");
    return SuccessResponseDto.of(result);
  }



  @Put("/:organization/:challengeId")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async modifySatisfactionStatus(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number, 
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<void>>  {
    await this.satisfactionService.modifySatisfactionStatus(user.userId, organization, challengeId);
    this.logger.log("유저 챌린지 만족도 조사 완료");
    return SuccessResponseDto.of();
  }



}