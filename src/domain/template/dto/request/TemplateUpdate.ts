import { IsNotEmpty, ValidateNested } from 'class-validator';
import { WriteTemplateContent } from '../values/TemplateContent.js';
import { Type } from 'class-transformer';

export class TemplateUpdate {
  @IsNotEmpty({ message: 'hi' })
  public userTemplateId: number;

  @ValidateNested({ each: true })
  @Type(() => WriteTemplateContent)
  @IsNotEmpty()
  public templateContent: Array<WriteTemplateContent>;

  public getUserTemplateId() {
    return this.userTemplateId;
  }

  public getTemplateContent() {
    return this.templateContent;
  }
}
