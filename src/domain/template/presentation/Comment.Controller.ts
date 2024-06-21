import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CommentService } from "../service/Comment.Service.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { MyComment } from "../dto/response/MyComment.js";
import { CommentCheck } from "../dto/request/CommentCheck.js";
import { CommentInsert } from "../dto/request/CommentInsert.js";
import { CommentId } from "../dto/response/CommentId.js";
import { CommentUpdate } from "../dto/request/CommentUpdate.js";
import { CommentDelete } from "../dto/request/CommentDelete.js";

@Controller("/api/template/comment")
export class CommentController{
  private readonly logger = new Logger(CommentController.name);
    constructor(
        private readonly commentService: CommentService
    ){}

    @Patch("/check")
    @HttpCode(200)
    public async checkComment(
      @Body() commentCheck: CommentCheck
    ): Promise<SuccessResponseDto<void>>{
      await this.commentService.checkComment(commentCheck.getCommentId());
      this.logger.log("댓글 확인 체킹 완료");
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
      this.logger.log("챌린지에 따른 내 템플릿 조회 완료");
      return SuccessResponseDto.of(result);
    }


    @Patch()
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async updateComment(
      @Body() commentUpdate: CommentUpdate,
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>  {
      await this.commentService.updateComment(user.user_id, commentUpdate.getOrganization(), commentUpdate.getCommentId(), commentUpdate.getContent());
      this.logger.log("댓글 수정 완료");
      return SuccessResponseDto.of();
    }

    @Post()
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async addComment(
      @Body() commentInsert: CommentInsert,
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<CommentId>>  {
      const result = await this.commentService.addComment(user.user_id, commentInsert.getOrganization(), commentInsert.getUserTemplateId(), commentInsert.getContent(), commentInsert.getCommentGroup());
      this.logger.log("댓글 추가 완료");
      return SuccessResponseDto.of(result);
    }


    @Delete()
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async deleteComment(
      @Body() commentDelete: CommentDelete,
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>  {
      await this.commentService.deleteComment(user.user_id, commentDelete.getOrganization(), commentDelete.getCommentId());
      this.logger.log("댓글 삭제 완료");
      return SuccessResponseDto.of();
    }





}