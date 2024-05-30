
import { LikeServie } from "../service/Like.Service.js";
import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { LikeCheck } from "../dto/request/LikeCheck.js";

@Controller('/api/template/like')
export class LikeController{

    constructor(
        private readonly likeService:LikeServie
    ){}


    @Patch("check")
    @HttpCode(200)
    public async checkLike(
        @Body() likeCheck : LikeCheck
    ): Promise<SuccessResponseDto<void>>  {
      await this.likeService.checkLike(likeCheck.getLikeId())
      return SuccessResponseDto.of();
    }
}