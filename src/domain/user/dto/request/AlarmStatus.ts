import { IsNotEmpty } from 'class-validator';

export class AlarmStatus {
  @IsNotEmpty()
  content: string;

  public getContent() {
    return this.content;
  }
}
