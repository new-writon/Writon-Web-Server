import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from '../service/Comment.Service';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator';
import { User } from '../../user/domain/entity/User';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto';
import { MyComment } from '../dto/response/MyComment';
import { CommentCheck } from '../dto/request/CommentCheck';
import { CommentInsert } from '../dto/request/CommentInsert';
import { CommentId } from '../dto/response/CommentId';
import { CommentUpdate } from '../dto/request/CommentUpdate';
import { CommentDelete } from '../dto/request/CommentDelete';

@Controller('/api/template/comment')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);
  constructor(private readonly commentService: CommentService) {}

  @Get('/:organization/challengeId/:challengeId')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringMyComment(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<MyComment[]>> {
    const result = await this.commentService.bringMyComment(
      user.userId,
      organization,
      challengeId,
    );
    this.logger.log('챌린지에 따른 내가 단 댓글 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Get('/:organization/userTemplateId/:userTemplateId')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringCommentInformation(
    @Param('userTemplateId') userTemplateId: number,
    @Param('organization') organization: string,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<CommentWithReplies[]>> {
    const result = await this.commentService.bringCommentInformation(
      user.userId,
      organization,
      userTemplateId,
    );
    this.logger.log('템플릿 댓글 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Patch('/check')
  @HttpCode(200)
  public async checkComment(
    @Body() commentCheck: CommentCheck,
  ): Promise<SuccessResponseDto<void>> {
    await this.commentService.checkComment(commentCheck.getCommentId());
    this.logger.log('댓글 확인 체킹 완료');
    return SuccessResponseDto.of();
  }

  @Patch()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async modifyComment(
    @Body() commentUpdate: CommentUpdate,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<void>> {
    await this.commentService.modifyComment(
      user.userId,
      commentUpdate.getOrganization(),
      commentUpdate.getCommentId(),
      commentUpdate.getContent(),
    );
    this.logger.log('댓글 수정 완료');
    return SuccessResponseDto.of();
  }

  @Post()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async penetrateComment(
    @Body() commentInsert: CommentInsert,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<CommentId>> {
    const result = await this.commentService.penetrateComment(
      user.userId,
      commentInsert,
    );
    this.logger.log('댓글 추가 완료');
    return SuccessResponseDto.of(result);
  }

  @Delete()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async eraseComment(
    @Body() commentDelete: CommentDelete,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<void>> {
    await this.commentService.eraseComment(
      user.userId,
      commentDelete.getOrganization(),
      commentDelete.getCommentId(),
    );
    this.logger.log('댓글 삭제 완료');
    return SuccessResponseDto.of();
  }
}
