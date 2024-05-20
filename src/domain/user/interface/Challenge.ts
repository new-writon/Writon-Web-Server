
interface ChallengeAllInformationCustom {
    [key: string]: {
      challengeId: number;
      deposit: number;
      challengeDayCount: string;
      deductions: { start_count: number; end_count: number; deduction_amount: number }[];
    };
  }