import { Body, Controller, HttpCode, Patch, UseGuards } from "@nestjs/common";
import { ResponseService } from "../service/Response.Service.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { ReEngagementCheck } from "../dto/request/ReEngagementCheck.js";

@Controller('/api/satisfaction')
export class ResponseController{
    
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
    return SuccessResponseDto.of();
  }
}