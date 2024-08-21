import { InternalServerErrorException } from "@nestjs/common";


export class UserChallengeSituation {
    private nickname: string;
    private userProfile: string;
    private organization: string;
    private challenge: string;
    private overlapPeriod: number;
    private refundCondition: string;
    private challengeOverlapCount: number;
    private challengeSuccessCount: number;
    private overlapDeposit: number;
    private challengeDeposit: number;

    constructor(
        nickname: string,
        userProfile: string,
        organization: string,
        challenge: string,
        overlapPeriod: number,
        refundCondition: string,
        challengeOverlapCount: number,
        challengeSuccessCount: number,
        overlapDeposit: number,
        challengeDeposit: number
    ) {
        this.setNickname(nickname);
        this.setUserProfile(userProfile);
        this.setOrganization(organization);
        this.setChallenge(challenge);
        this.setOverlapPeriod(overlapPeriod);
        this.setRefundCondition(refundCondition);
        this.setChallengeOverlapCount(challengeOverlapCount);
        this.setChallengeSuccessCount(challengeSuccessCount);
        this.setOverlapDeposit(overlapDeposit);
        this.setChallengeDeposit(challengeDeposit);
    }

    public static of(
        nickname: string,
        userProfile: string,
        organization: string,
        challenge: string,
        overlapPeriod: number,
        refundCondition: string,
        challengeOverlapCount: number,
        challengeSuccessCount: number,
        overlapDeposit: number,
        challengeDeposit: number
    ): UserChallengeSituation {
        return new UserChallengeSituation(
            nickname,
            userProfile,
            organization,
            challenge,
            overlapPeriod,
            refundCondition,
            challengeOverlapCount,
            challengeSuccessCount,
            overlapDeposit,
            challengeDeposit
        );
    }

 

    setNickname(nickname: string): void {
        if (nickname === null) {
            throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        }
        this.nickname = nickname;
    }

    setUserProfile(userProfile: string): void {
        this.userProfile = userProfile;
    }

    setOrganization(organization: string): void {
        if (organization === null) {
            throw new InternalServerErrorException(`${__dirname} : organization 값이 존재하지 않습니다.`);
        }
        this.organization = organization;
    }

    setChallenge(challenge: string): void {
        if (challenge === null) {
            throw new InternalServerErrorException(`${__dirname} : challenge 값이 존재하지 않습니다.`);
        }
        this.challenge = challenge;
    }

    setOverlapPeriod(overlapPeriod: number): void {
        if (overlapPeriod === null) {
            throw new InternalServerErrorException(`${__dirname} : overlapPeriod 값이 존재하지 않습니다.`);
        }
        this.overlapPeriod = overlapPeriod;
    }

    setRefundCondition(refundCondition: string): void {
        this.refundCondition = refundCondition;
    }

    setChallengeOverlapCount(challengeOverlapCount: number): void {
        if (challengeOverlapCount === null) {
            throw new InternalServerErrorException(`${__dirname} : challengeOverlapCount 값이 존재하지 않습니다.`);
        }
        this.challengeOverlapCount = challengeOverlapCount;
    }

    setChallengeSuccessCount(challengeSuccessCount: number): void {
        if (challengeSuccessCount === null) {
            throw new InternalServerErrorException(`${__dirname} : challengeSuccessCount 값이 존재하지 않습니다.`);
        }
        this.challengeSuccessCount = challengeSuccessCount;
    }

    setOverlapDeposit(overlapDeposit: number): void {
        if (overlapDeposit === null) {
            throw new InternalServerErrorException(`${__dirname} : overlapDeposit 값이 존재하지 않습니다.`);
        }
        this.overlapDeposit = overlapDeposit;
    }

    setChallengeDeposit(challengeDeposit: number): void {
        if (challengeDeposit === null) {
            throw new InternalServerErrorException(`${__dirname} : challengeDeposit 값이 존재하지 않습니다.`);
        }
        this.challengeDeposit = challengeDeposit;
    }
}