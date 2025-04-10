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
import { CurrentUser } from 'src/domain/auth/decorators/Auth.Decorator';
import { JWTAuthGuard } from 'src/domain/auth/guards/JwtAuth.Guard';
import { CommentInputPort } from 'src/domain/template/application/port/input/CommentInputPort';
import { CommentCheck } from 'src/domain/template/dto/request/CommentCheck';
import { CommentDelete } from 'src/domain/template/dto/request/CommentDelete';
import { CommentInsert } from 'src/domain/template/dto/request/CommentInsert';
import { CommentUpdate } from 'src/domain/template/dto/request/CommentUpdate';
import { CommentId } from 'src/domain/template/dto/response/CommentId';
import { MyComment } from 'src/domain/template/dto/response/MyComment';
import { User } from 'src/domain/user/domain/entity/User';
import { SuccessResponseDto } from 'src/global/response/SuccessResponseDto';

@Controller('/api/template/comment')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);
  constructor(private readonly commentService: CommentInputPort) {}

  @Get('/:organization/challengeId/:challengeId')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringMyComment(
    @Param('organization') organization: string,
    @Param('challengeId') challengeId: number,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<MyComment[]>> {
    const result = await this.commentService.execute<
      [string, number, number],
      Promise<MyComment[]>
    >('SELECT_MY_COMMENT', organization, challengeId, user.userId);
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
    const result = await this.commentService.execute<
      [string, number, number],
      Promise<CommentWithReplies[]>
    >('SELECT_TEMPLATE_COMMENT', organization, userTemplateId, user.userId);
    this.logger.log('템플릿 댓글 조회 완료');
    return SuccessResponseDto.of(result);
  }

  @Patch('/check')
  @HttpCode(200)
  public async checkComment(@Body() commentCheck: CommentCheck): Promise<SuccessResponseDto<void>> {
    await this.commentService.execute('CHECK_COMMENT', commentCheck);
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
    await this.commentService.execute('UPDATE_COMMENT', commentUpdate, user.userId);
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
    const result = await this.commentService.execute<[CommentInsert, number], CommentId>(
      'INSERT_COMMENT',
      commentInsert,
      user.userId,
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
    await this.commentService.execute('DELETE_COMMENT', commentDelete, user.userId);
    this.logger.log('댓글 삭제 완료');
    return SuccessResponseDto.of();
  }
}
