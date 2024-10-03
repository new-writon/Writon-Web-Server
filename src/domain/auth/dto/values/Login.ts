import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class Login {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  private identifier: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  private password: string;

  public getIdentifier(): string {
    return this.identifier;
  }

  public getPassword(): string {
    return this.password;
  }
}
