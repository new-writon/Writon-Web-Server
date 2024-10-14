import { IsNotEmpty } from 'class-validator';

export class CommentCheck {
  @IsNotEmpty()
  private commentId: number;

  public getCommentId() {
    return this.commentId;
  }
}
