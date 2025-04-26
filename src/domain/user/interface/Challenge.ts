class Deduction {
  private startCount: number;
  private endCount: number;
  private deductionAmount: number;

  constructor(startCount: number, endCount: number, deductionAmount: number) {
    this.startCount = startCount;
    this.endCount = endCount;
    this.deductionAmount = deductionAmount;
  }

  public getStartCount(): number {
    return this.startCount;
  }

  public getEndCount(): number {
    return this.endCount;
  }

  public getDeductionAmount(): number {
    return this.deductionAmount;
  }
}

export class ChallengeAllInformationCustom {
  private challengeId: number;
  private deposit: number;
  private challengeDayCount: string;
  private deductions: Deduction[];

  constructor(
    challengeId: number,
    deposit: number,
    challengeDayCount: string,
    deductions: Deduction[],
  ) {
    this.challengeId = challengeId;
    this.deposit = deposit;
    this.challengeDayCount = challengeDayCount;
    this.deductions = deductions;
  }

  public getChallengeId(): number {
    return this.challengeId;
  }

  public getDeposit(): number {
    return this.deposit;
  }

  public getChallengeDayCount(): string {
    return this.challengeDayCount;
  }

  public getDeductions(): Deduction[] {
    return this.deductions;
  }
}

export class ChallengeAllInformationCustomContainer {
  private data: { [key: string]: ChallengeAllInformationCustom } = {};

  public addChallenge(key: string, challenge: ChallengeAllInformationCustom) {
    this.data[key] = challenge;
  }

  public getChallenge(key: string): ChallengeAllInformationCustom | undefined {
    return this.data[key];
  }

  public getAllChallenges(): { [key: string]: ChallengeAllInformationCustom } {
    return this.data;
  }
}
