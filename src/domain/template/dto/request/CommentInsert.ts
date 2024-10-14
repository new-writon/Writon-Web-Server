import { IsNotEmpty } from 'class-validator';

export class CommentInsert {
  @IsNotEmpty()
  private organization: string;

  @IsNotEmpty()
  private userTemplateId: number;

  @IsNotEmpty()
  private content: string;

  @IsNotEmpty()
  private commentGroup: number;

  public getOrganization() {
    return this.organization;
  }

  public getUserTemplateId() {
    return this.userTemplateId;
  }

  public getContent() {
    return this.content;
  }

  public getCommentGroup() {
    return this.commentGroup;
  }
}
