
import { LikeServie } from "../service/Like.Service.js";
import { Body, Controller, Get, HttpCode, Logger, Param, Patch, Post, Put, UseGuards} from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto';
import { LikeCheck } from "../dto/request/LikeCheck";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator";
import { User } from "../../user/domain/entity/User";
import { LikeClick } from "../dto/request/LikeClick";
import { LikeCount } from "../dto/response/LikeCount";

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
      const result = await this.likeService.penetrateLike(user.userId, likeCheck.getUserTemplateId(), likeCheck.getOrganization());
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
        const result = await this.likeService.eraseLike(user.userId, likeCheck.getUserTemplateId(), likeCheck.getOrganization());   
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

    @Get('/click/:userTemplateId')
    @HttpCode(200)
    public async bringLikeClickedUser(
        @Param("userTemplateId") userTemplateId:number
    ): Promise<SuccessResponseDto<any>>  {
        const result = await this.likeService.bringLikeClickedUser(userTemplateId);
        this.logger.log("좋아요 누른 유저 정보 조회 완료");
        return SuccessResponseDto.of(result);
    }




}