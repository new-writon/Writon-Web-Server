class ChallengeAllInformation {
    private challengeId: number;
    private deposit: number;
    private challengeDayCount: string;
    private startCount: number;
    private endCount: number;
    private deductionAmount: number;

    constructor(
        challengeId: number,
        deposit: number,
        challengeDayCount: string,
        startCount: number,
        endCount: number,
        deductionAmount: number
      ) {
        this.challengeId = challengeId;
        this.deposit = deposit;
        this.challengeDayCount = challengeDayCount;
        this.startCount = startCount;
        this.endCount = endCount;
        this.deductionAmount = deductionAmount;
      }

    public static of (      
        challengeId: number,
        deposit: number,
        challengeDayCount: string,
        startCount: number,
        endCount: number,
        deductionAmount: number){
            return new ChallengeAllInformation(challengeId, deposit, challengeDayCount, startCount, endCount, deductionAmount);
        }
  
    public getChallengeId(): number {
      return this.challengeId;
    }
  
    public setChallengeId(challengeId: number): void {
      this.challengeId = challengeId;
    }
  
    // Getter and Setter for deposit
    public getDeposit(): number {
      return this.deposit;
    }
  
    public setDeposit(deposit: number): void {
      this.deposit = deposit;
    }
  

    public getChallengeDayCount(): string {
      return this.challengeDayCount;
    }
  
    public setChallengeDayCount(challengeDayCount: string): void {
      this.challengeDayCount = challengeDayCount;
    }
  

    public getStartCount(): number {
      return this.startCount;
    }
  
    public setStartCount(startCount: number): void {
      this.startCount = startCount;
    }
  
    public getEndCount(): number {
      return this.endCount;
    }
  
    public setEndCount(endCount: number): void {
      this.endCount = endCount;
    }
  
    public getDeductionAmount(): number {
      return this.deductionAmount;
    }
  
    public setDeductionAmount(deductionAmount: number): void {
      this.deductionAmount = deductionAmount;
    }
  }
  