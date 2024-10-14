import { IsNotEmpty } from 'class-validator';

export class AffiliationStart {
  @IsNotEmpty()
  private organization: string;

  @IsNotEmpty()
  private nickname: string;

  @IsNotEmpty()
  private position: string;

  @IsNotEmpty()
  private positionIntroduce: string;

  @IsNotEmpty()
  private hireDate: string;

  @IsNotEmpty()
  private company: string;

  @IsNotEmpty()
  private companyPublic: boolean;

  getOrganization() {
    return this.organization;
  }

  getNickname() {
    return this.nickname;
  }

  getPosition() {
    return this.position;
  }

  getPositionIntroduce() {
    return this.positionIntroduce;
  }

  getHireDate() {
    return this.hireDate;
  }

  getCompany() {
    return this.company;
  }

  getCompanyPublic() {
    return this.companyPublic;
  }
}
