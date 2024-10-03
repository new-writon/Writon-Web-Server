import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LocalLogin {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  private identifier: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  private password: string;

  @IsNotEmpty()
  private organization: string;

  @IsNotEmpty()
  private challengeId: number;

  public getOrganization(): string {
    return this.organization;
  }

  public getChallengeId(): number {
    return this.challengeId;
  }

  public getIdentifier(): string {
    return this.identifier;
  }

  public getPassword(): string {
    return this.password;
  }
}
