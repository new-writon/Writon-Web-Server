import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export class Participant{
    private profile: string | null;
    private job: string;
    private job_introduce: string;
    private nickname: string;
    private company_public: number;
    private company: string | null;
    private cheering_phrase: string | null;
    private cheering_phrase_date: Date;


    constructor(
        profile: string | null,
        job: string,
        jobIntroduce: string,
        nickname: string,
        companyPublic: number,
        company: string | null,
        cheeringPhrase: string | null,
        cheeringPhraseDate: string | Date
    ) {
        this.setProfile(profile);
        this.setJob(job);
        this.setJobIntroduce(jobIntroduce);
        this.setNickname(nickname);
        this.setCompanyPublic(companyPublic);
        this.setCompany(company);
        this.setCheeringPhrase(cheeringPhrase);
        this.setCheeringPhraseDate(cheeringPhraseDate);
    }

    public static myInformationOf(myInformation:Participant){
            return new Participant(myInformation.profile, myInformation.job, myInformation.job_introduce, myInformation.nickname, myInformation.company_public, myInformation.company,
                myInformation.cheering_phrase, myInformation.cheering_phrase_date
            );
    }

    public static participantOf(participants:Participant[]){

        return participants.map((participant) => {
            return new Participant(participant.profile, participant.job, participant.job_introduce, participant.nickname, participant.company_public, participant.company,
                participant.cheering_phrase, participant.cheering_phrase_date
            );
        })
       
}



    private setProfile(profile: string | null) {
        this.profile = profile;
    }

    private setJob(job: string) {
        if (!job) throw new InternalServerErrorException(`${__dirname} : job 값이 존재하지 않습니다.`);
        this.job = job;
    }

    private setJobIntroduce(jobIntroduce: string) {
        if (!jobIntroduce) throw new InternalServerErrorException(`${__dirname} : jobIntroduce 값이 존재하지 않습니다.`);
        this.job_introduce = jobIntroduce;
    }

    private setNickname(nickname: string) {
        if (!nickname) throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        this.nickname = nickname;
    }

    private setCompanyPublic(companyPublic: number) {
        if (companyPublic === null || companyPublic === undefined) throw new InternalServerErrorException(`${__dirname} : companyPublic 값이 존재하지 않습니다.`);
        this.company_public = companyPublic;
    }

    private setCompany(company: string | null) {
        this.company = company;
    }

    private setCheeringPhrase(cheeringPhrase: string | null) {
        this.cheering_phrase = cheeringPhrase;
    }

    private setCheeringPhraseDate(cheeringPhraseDate: string | Date) {
        this.cheering_phrase_date = new Date(cheeringPhraseDate);
    }

    getProfile(): string | null{
        return this.profile;
    }

    getJob(): string {
        return this.job;
    }

    getJobIntroduce(): string {
        return this.job_introduce;
    }

    getNickname(): string {
        return this.nickname;
    }

    getCompanyPublic(): number {
        return this.company_public;
    }

    getCompany(): string | null {
        return this.company;
    }

    getCheeringPhrase(): string | null {
        return this.cheering_phrase;
    }

    getCheeringPhraseDate(): Date {
        return this.cheering_phrase_date;
    }


    changeCheeringPhrase(cheeringPhrase: string | null) {
        this.cheering_phrase = cheeringPhrase;
    }

    changeCompany(company: string | null) {
        this.company = company;
    }


}