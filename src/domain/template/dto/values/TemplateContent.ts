import { IsNotEmpty } from 'class-validator';

export class WriteTemplateContent {
  @IsNotEmpty({ message: '메롱' })
  public questionId: number;

  @IsNotEmpty({ message: '메롱' })
  public content: string;

  @IsNotEmpty()
  public visibility: boolean;

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
