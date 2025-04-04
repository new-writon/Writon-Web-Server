import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/domain/auth/decorators/Auth.Decorator';
import { JWTAuthGuard } from 'src/domain/auth/guards/JwtAuth.Guard';
import { LikeInputPort } from 'src/domain/template/application/port/input/LikeInputPort';
import { LikeCheck } from 'src/domain/template/dto/request/LikeCheck';
import { LikeClick } from 'src/domain/template/dto/request/LikeClick';
import { LikeCount } from 'src/domain/template/dto/response/LikeCount';
import { LikeClickedUser } from 'src/domain/template/dto/values/LikeClickedUser';
import { User } from 'src/domain/user/domain/entity/User';
import { SuccessResponseDto } from 'src/global/response/SuccessResponseDto';

@Controller('/api/template/like')
export class LikeController {
  private readonly logger = new Logger(LikeController.name);
  constructor(private readonly likeService: LikeInputPort) {}

  @Patch('/check')
  @HttpCode(200)
  public async checkLike(@Body() likeCheck: LikeCheck): Promise<SuccessResponseDto<void>> {
    await this.likeService.execute('CHECK_LIKE', likeCheck);
    this.logger.log('좋아요 체킹 완료');
    return SuccessResponseDto.of();
  }

  @Post()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async penetrateLike(
    @Body() likeClick: LikeClick,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<LikeCount>> {
    const result = await this.likeService.execute<[LikeClick, number], Promise<LikeCount>>(
      'INSERT_LIKE',
      likeClick,
      user.userId,
    );
    this.logger.log('좋아요 추가 완료');
    return SuccessResponseDto.of(result);
  }

  @Put()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async eraseLike(
    @Body() likeClick: LikeClick,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<LikeCount>> {
    const result = await this.likeService.execute<[LikeClick, number], Promise<LikeCount>>(
      'PUT_LIKE',
      likeClick,
      user.userId,
    );
    this.logger.log('좋아요 취소 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/:userTemplateId')
  @HttpCode(200)
  public async bringLikeCount(
    @Param('userTemplateId') userTemplateId: number,
  ): Promise<SuccessResponseDto<LikeCount>> {
    const result = await this.likeService.execute<[number], LikeCount>(
      'SELECT_LIKE_COUNT',
      userTemplateId,
    );
    this.logger.log('좋아요 개수 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/click/:userTemplateId')
  @HttpCode(200)
  public async bringLikeClickedUser(
    @Param('userTemplateId') userTemplateId: number,
  ): Promise<SuccessResponseDto<LikeClickedUser[]>> {
    const result = await this.likeService.execute<[number], Promise<LikeClickedUser[]>>(
      'SELECT_PRESS_USER',
      userTemplateId,
    );
    this.logger.log('좋아요 누른 유저 정보 조회 완료');
    return SuccessResponseDto.of(result);
  }
}
