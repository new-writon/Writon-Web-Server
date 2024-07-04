import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ChallengeInformation {

    public challengeId: number;
    public deposit: number;
    public challengeDayCount: string;
    public startCount: number;
    public endCount: number;
    public deductionAmount:number;


    getChallengeId(): number {
        return this.challengeId;
    }

    getDeposit(): number {
        return this.deposit;
    }

    getChallengeDayCount(): string {
        return this.challengeDayCount;
    }

    getStartCount(): number {
        return this.startCount;
    }

    getEndCount(): number {
        return this.endCount;
    }

    getDeductionAmount(): number {
        return this.deductionAmount;
    }

}