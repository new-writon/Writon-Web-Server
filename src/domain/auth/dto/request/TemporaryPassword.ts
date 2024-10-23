import { IsEmail, IsNotEmpty } from 'class-validator';

export class TemporaryPassword {
  @IsNotEmpty()
  @IsEmail()
  private email: string;

  @IsNotEmpty()
  private identifier: string;

  public getEmail(): string {
    return this.email;
  }

  public getIdentifier(): string {
    return this.identifier;
  }
}
