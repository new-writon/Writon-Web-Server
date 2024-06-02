import { Controller, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { SatisfactionService } from "../service/Satisfaction.Service.js";
import { SatisfactionStatus } from "../dto/response/SatisfactionSatus.js";

@Controller('/api/satisfaction')
export class SatisfactionController{

    constructor(
        private readonly satisfactionService: SatisfactionService
    ){}


    @Get("/:organization/:challengeId")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringSatisfactionStatus(
      @Param('organization') organization: string,
      @Param('challengeId') challengeId: number, 
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<SatisfactionStatus>>  {
      const result = await this.satisfactionService.bringSatisfactionStatus(user.user_id, organization, challengeId);
      return SuccessResponseDto.of(result);
    }



    @Put("/:organization/:challengeId")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async updateSatisfactionStatus(
      @Param('organization') organization: string,
      @Param('challengeId') challengeId: number, 
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>  {
      await this.satisfactionService.updateSatisfactionStatus(user.user_id, organization, challengeId);
      return SuccessResponseDto.of();
    }
}