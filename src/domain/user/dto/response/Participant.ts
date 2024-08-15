import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export class Participant{
    private profile: string | null;
    private position: string;
    private positionIntroduce: string;
    private nickname: string;
    private companyPublic: number;
    private company: string | null;
    private cheeringPhrase: string | null;
    private cheeringPhraseDate: Date;


    constructor(
        profile: string | null,
        position: string,
        jobIntroduce: string,
        nickname: string,
        companyPublic: number,
        company: string | null,
        cheeringPhrase: string | null,
        cheeringPhraseDate: string | Date
    ) {
        this.setProfile(profile);
        this.setPosition(position);
        this.setJobIntroduce(jobIntroduce);
        this.setNickname(nickname);
        this.setCompanyPublic(companyPublic);
        this.setCompany(company);
        this.setCheeringPhrase(cheeringPhrase);
        this.setCheeringPhraseDate(cheeringPhraseDate);
    }

    public static myInformationOf(myInformation:Participant){
            return new Participant(myInformation.profile, myInformation.position, myInformation.positionIntroduce, myInformation.nickname, myInformation.companyPublic, myInformation.company,
                myInformation.cheeringPhrase, myInformation.cheeringPhraseDate
            );
    }

    public static participantOf(participants:Participant[]){

        return participants.map((participant) => {
            return new Participant(participant.profile, participant.position, participant.positionIntroduce, participant.nickname, participant.companyPublic, participant.company,
                participant.cheeringPhrase, participant.cheeringPhraseDate
            );
        })
       
}



    private setProfile(profile: string | null) {
        this.profile = profile;
    }

    private setPosition(position: string) {
        if (position===null) throw new InternalServerErrorException(`${__dirname} : position값이 존재하지 않습니다.`);
        this.position = position;
    }

    private setJobIntroduce(positionIntroduce: string) {
        if (positionIntroduce===null) throw new InternalServerErrorException(`${__dirname} : positionIntroduce 값이 존재하지 않습니다.`);
        this.positionIntroduce = positionIntroduce;
    }

    private setNickname(nickname: string) {
        if (nickname===null) throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        this.nickname = nickname;
    }

    private setCompanyPublic(companyPublic: number) {
        if (companyPublic === null || companyPublic === undefined) throw new InternalServerErrorException(`${__dirname} : companyPublic 값이 존재하지 않습니다.`);
        this.companyPublic = companyPublic;
    }

    private setCompany(company: string | null) {
        this.company = company;
    }

    private setCheeringPhrase(cheeringPhrase: string | null) {
        this.cheeringPhrase = cheeringPhrase;
    }

    private setCheeringPhraseDate(cheeringPhraseDate: string | Date) {
        this.cheeringPhraseDate = new Date(cheeringPhraseDate);
    }

    getProfile(): string | null{
        return this.profile;
    }

    getPosition(): string {
        return this.position;
    }

    getPositionIntroduce(): string {
        return this.positionIntroduce;
    }

    getNickname(): string {
        return this.nickname;
    }

    getCompanyPublic(): number {
        return this.companyPublic;
    }

    getCompany(): string | null {
        return this.company;
    }

    getCheeringPhrase(): string | null {
        return this.cheeringPhrase;
    }

    getCheeringPhraseDate(): Date {
        return this.cheeringPhraseDate;
    }


    changeCheeringPhrase(cheeringPhrase: string | null) {
        this.cheeringPhrase = cheeringPhrase;
    }

    changeCompany(company: string | null) {
        this.company = company;
    }


}