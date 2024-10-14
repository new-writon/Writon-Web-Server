import { IsNotEmpty } from 'class-validator';

export class WriteTemplateContent {
  @IsNotEmpty()
  private questionId: number;

  @IsNotEmpty()
  private content: string;

  @IsNotEmpty()
  private visibility: boolean;

  public getQuestionId() {
    return this.questionId;
  }

  public getContent() {
    return this.content;
  }

  public getVisibility() {
    return this.visibility;
  }
}
