export class Restart {
  private restart: number;

  constructor(restart: number) {
    this.setRestart(restart);
  }

  public static of(restart: number) {
    return new Restart(restart);
  }

  private setRestart(restart: number) {
    this.restart = restart;
  }
}
