export class AlarmStatus {
  content: string;

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
