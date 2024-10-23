import { IsIn } from 'class-validator';

export class AlarmStatus {
  @IsIn([null, 'denied', 'granted'], {
    message: 'Content must be null, denied, or granted',
  })
  content: string | null;

  public getContent() {
    return this.content;
  }

  constructor(content: string) {
    this.setContent(content);
  }

  public static of(content: string) {
    return new AlarmStatus(content);
  }

  private setContent(content: string) {
    this.content = content;
  }
}
