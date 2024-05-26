import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { ChallengeInvite } from "../dto/request/ChallengeInvite.js";
import { ChallengeInviteService } from "../service/ChallengeInvite.Service.js";

@Controller("/api/challenge/invite")
export class ChallengeInviteController {

    constructor(
        private readonly challengeInviteService: ChallengeInviteService
    ){}

    @Post("")
    @HttpCode(200)
    public async sendInvitation(
        @Body() challengeInvite: ChallengeInvite
    ): Promise<SuccessResponseDto<void>>{
        await this.challengeInviteService.sendInvitation(challengeInvite.getOrganization(), challengeInvite.getChallenge(), challengeInvite.getEmail())
        return SuccessResponseDto.of();
    }
}