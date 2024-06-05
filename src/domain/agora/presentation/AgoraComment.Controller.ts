

import { Body, Controller, Get, HttpCode, Logger, Param, Post, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { AgoraCommentService } from "../service/AgoraComment.Service.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { AgoraCommentInsert } from "../dto/request/AgoraCommentInsert.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";



@Controller("/api/agora/comment")
export class AgoraCommentController{

    private readonly logger = new Logger(AgoraCommentController.name);
    constructor(
        private readonly agoraCommentService: AgoraCommentService
    ){}

    @Post('/write')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async writeAgoraComment(
        @Body() agoraCommentInsert: AgoraCommentInsert,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>{
        await this.agoraCommentService.writeAgoraComment(user.user_id, agoraCommentInsert.getAgoraId(), agoraCommentInsert.getOragnization(), agoraCommentInsert.getAgoraComment());
        this.logger.log("아고라 댓글 쓰기 완료");
        return SuccessResponseDto.of();
    }



}