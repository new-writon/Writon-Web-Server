
import { LikeServie } from "../service/Like.Service.js";
import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { LikeCheck } from "../dto/request/LikeCheck.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { User } from "../../user/domain/entity/User.js";
import { LikeClick } from "../dto/request/LikeClick.js";
import { LikeCount } from "../dto/response/LikeCount.js";

@Controller('/api/template/like')
export class LikeController{
    private readonly logger = new Logger(LikeController.name);
    constructor(
        private readonly likeService:LikeServie
    ){}


    @Patch("/check")
    @HttpCode(200)
    public async checkLike(
        @Body() likeCheck : LikeCheck
    ): Promise<SuccessResponseDto<void>>  {
      await this.likeService.checkLike(likeCheck.getLikeId())
      return SuccessResponseDto.of();
    }

    @Post()
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async penetrateLike(
        @Body() likeCheck : LikeClick,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<LikeCount>>  {
      const result = await this.likeService.penetrateLike(user.user_id, likeCheck.getUserTemplateId(), likeCheck.getOrganization());
      this.logger.log("좋아요 추가 완료");
      return SuccessResponseDto.of(result);
    }


    @Put()
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async eraseLike(
        @Body() likeCheck : LikeClick,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<LikeCount>>  {
        const result = await this.likeService.eraseLike(user.user_id, likeCheck.getUserTemplateId(), likeCheck.getOrganization());   
        this.logger.log("좋아요 취소 완료");
      return SuccessResponseDto.of(result);
    }

    @Get('/:userTemplateId')
    @HttpCode(200)
    public async bringLikeCount(
        @Param("userTemplateId") userTemplateId:number
    ): Promise<SuccessResponseDto<LikeCount>>  {
       const result = await this.likeService.bringLikeCount(userTemplateId);
    this.logger.log("좋아요 개수 조회 완료");
       return SuccessResponseDto.of(result);
    }
}