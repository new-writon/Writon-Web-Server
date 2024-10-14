import { IsNotEmpty } from 'class-validator';

export class CommentUpdate {
  @IsNotEmpty()
  private organization: string;

  @IsNotEmpty()
  private content: string;

  @IsNotEmpty()
  private commentId: number;

  public getOrganization() {
    return this.organization;
  }

  public getContent() {
    return this.content;
  }

  public getCommentId() {
    return this.commentId;
  }
}
