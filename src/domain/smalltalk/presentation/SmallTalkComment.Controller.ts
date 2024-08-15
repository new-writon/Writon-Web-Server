

import { Body, Controller, Get, HttpCode, Logger, Param, Post, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { SmallTalkCommentService } from "../service/SmallTalkComment.Service.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { SmallTalkCommentInsert } from "../dto/request/SmallTalkCommentInsert.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { SmallTalkCommentRead } from "../dto/response/SmallTalkCommentRead.js";



@Controller("/api/small-talk/comment")
export class SmallTalkCommentController{

    private readonly logger = new Logger(SmallTalkCommentController.name);
    constructor(
        private readonly smallTalkCommentService: SmallTalkCommentService
    ){}

    @Get('/read/:smallTalkId')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringSmallTalkCommentRead(
        @Param('smallTalkId') smallTalkId:number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<SmallTalkCommentRead[]>>{
       const result = await this.smallTalkCommentService.bringSmallTalkCommentRead(user.userId, smallTalkId);
        this.logger.log("스몰톡 댓글 읽기 완료");
        return SuccessResponseDto.of(result);
    }

    @Post('/write')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async penetrateSmallTalkComment(
        @Body() smallTalkCommentInsert: SmallTalkCommentInsert,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>{
        await this.smallTalkCommentService.penetrateSmallTalkComment(user.userId, smallTalkCommentInsert.getSmallTalkId(), smallTalkCommentInsert.getOragnization(), smallTalkCommentInsert.getSmallTalkComment());
        this.logger.log("스몰톡 댓글 쓰기 완료");
        return SuccessResponseDto.of();
    }






}