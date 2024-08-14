

import { Body, Controller, Get, HttpCode, Logger, Param, Post, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { AgoraCommentService } from "../service/SmallTalkComment.Service.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { AgoraCommentInsert } from "../dto/request/AgoraCommentInsert.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { AgoraCommentRead } from "../dto/response/AgoraCommentRead.js";



@Controller("/api/agora/comment")
export class AgoraCommentController{

    private readonly logger = new Logger(AgoraCommentController.name);
    constructor(
        private readonly agoraCommentService: AgoraCommentService
    ){}

    @Get('/read/:agoraId')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringAgoraCommentRead(
        @Param('agoraId') agoraId:number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<AgoraCommentRead[]>>{
        console.log(agoraId)
       const result = await this.agoraCommentService.bringAgoraCommentRead(user.user_id, agoraId);
        this.logger.log("아고라 댓글 읽기 완료");
        return SuccessResponseDto.of(result);
    }

    @Post('/write')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async penetrateAgoraComment(
        @Body() agoraCommentInsert: AgoraCommentInsert,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>{
        await this.agoraCommentService.penetrateAgoraComment(user.user_id, agoraCommentInsert.getAgoraId(), agoraCommentInsert.getOragnization(), agoraCommentInsert.getAgoraComment());
        this.logger.log("아고라 댓글 쓰기 완료");
        return SuccessResponseDto.of();
    }






}