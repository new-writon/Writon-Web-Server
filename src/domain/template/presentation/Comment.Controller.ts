import { Body, Controller, Get, HttpCode, Param, Patch, UseGuards } from "@nestjs/common";
import { CommentService } from "../service/Comment.Service.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { MyComment } from "../dto/response/MyComment.js";
import { CommentUpdate } from "../dto/request/CommentUpdate.js";

@Controller("/api/template/comment")
export class CommentController{

    constructor(
        private readonly commentService: CommentService
    ){}

    @Patch("/check")
    @HttpCode(200)
    public async checkComment(
      @Body() commentUpdate: CommentUpdate
    ): Promise<SuccessResponseDto<void>>{
      await this.commentService.checkComment(commentUpdate.getCommentId());
      return SuccessResponseDto.of();
    }

    @Get("/:organization/:challengeId")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringMyTemplate(
      @Param('organization') organization: string,
      @Param('challengeId') challengeId: number,
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<MyComment[]>>  {
      const result = await this.commentService.bringCommentAccordingToOrganizationAndChallengeId(user.user_id, organization, challengeId);
      return SuccessResponseDto.of(result);
    }


}