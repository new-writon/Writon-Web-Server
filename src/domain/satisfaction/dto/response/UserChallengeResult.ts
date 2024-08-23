import { InternalServerErrorException } from "@nestjs/common";
import { Challenge } from "../../../challenge/domain/entity/Challenge";


export class UserChallengeResult{

    private nickname:string;
    private organization:string;
    private challengeOverlapCount:number;
    private challengeSuccessCount:number;
    private overlapDeposit:number;
    private challenge:string;
    private challengeDeposit:number;
    private reviewUrl: string | null;

    constructor(
        nickname:string,
        organization:string,
        challengeOverlapCount:number,
        challengeSuccessCount:number,
        overlapDeposit:number,
        challenge:string,
        challengeDeposit:number,
        reviewUrl: string | null
    ){
        this.setNickname(nickname);
        this.setOrganization(organization);
        this.setChallenge(challenge);
        this.setChallengeOverlapCount(challengeOverlapCount);
        this.setChallengeSuccessCount(challengeSuccessCount);
        this.setOverlapDeposit(overlapDeposit);
        this.setChallengeDeposit(challengeDeposit);
        this.setReviewUrl(reviewUrl);
    }

    public static of(
        nickname:string,
        organization:string,
        challengeOverlapCount:number,
        challengeSuccessCount:number,
        overlapDeposit:number,
        challengeData:Challenge
    ){
        return new UserChallengeResult(
            nickname,
            organization,
            challengeOverlapCount,
            challengeSuccessCount,
            overlapDeposit,
            challengeData.getName(),
            challengeData.getDeposit(),
            challengeData.getReviewUrl()
        )
    }

    private setNickname(nickname: string): void {
        if(nickname === null)throw new InternalServerErrorException (`${__dirname} : nickname값이 존재하지 않습니다.`);
        this.nickname = nickname;
    }

    private setOrganization(organization: string): void {
        if(organization === null)throw new InternalServerErrorException (`${__dirname} : organization 값이 존재하지 않습니다.`);
        this.organization = organization;
    }

    private setChallenge(challenge: string): void {
        if(challenge === null)throw new InternalServerErrorException (`${__dirname} : challenge 값이 존재하지 않습니다.`);
        this.challenge = challenge;
    }

    private setChallengeOverlapCount(challengeOverlapCount: number): void {
        if(challengeOverlapCount=== null)throw new InternalServerErrorException (`${__dirname} : challengeOverlapCount 값이 존재하지 않습니다.`);
        this.challengeOverlapCount = challengeOverlapCount;
    }

    private setChallengeSuccessCount(challengeSuccessCount: number): void {
        if(challengeSuccessCount === null)throw new InternalServerErrorException (`${__dirname} : challengeSuccessCount 값이 존재하지 않습니다.`);
        this.challengeSuccessCount = challengeSuccessCount;
    }

    private setOverlapDeposit(overlapDeposit: number): void {
        if(overlapDeposit === null)throw new InternalServerErrorException (`${__dirname} : overlapDeposit 값이 존재하지 않습니다.`);
        this.overlapDeposit = overlapDeposit;
    }

    private setChallengeDeposit(challengeDeposit: number): void {
        if(challengeDeposit === null)throw new InternalServerErrorException (`${__dirname} : challengeDeposit값이 존재하지 않습니다.`);
        this.challengeDeposit = challengeDeposit;
    }

    private setReviewUrl(reviewUrl: string | null): void {
        this.reviewUrl = reviewUrl;
    }

}