import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class UserProfile{
    private email: string;
    private userProfile: string;
    private accountNumber: string | null;
    private bank:string | null;
    private hiredate: Date;
    private company:string;
    private job: string;
    private jobIntroduce:string;

    constructor(
        email: string,
        userProfile: string,
        accountNumber: string | null,
        bank:string | null,
        hiredate: Date,
        company:string,
        job: string,
        jobIntroduce:string
    ){
        this.setEmail(email);
        this.setUserProfile(userProfile);
        this.setAccountNumber(accountNumber);
        this.setBank(bank);
        this.setHiredate(hiredate);
        this.setCompany(company);
        this.setJob(job);
        this.setJobIntroduce(jobIntroduce);
    }

    public static of(
        userProfile:UserProfile
    ){
        return new UserProfile(
            userProfile.email,
            userProfile.userProfile,
            userProfile.accountNumber,
            userProfile.bank,
            userProfile.hiredate,
            userProfile.company,
            userProfile.job,
            userProfile.jobIntroduce
        );
    }


    private setEmail(email: string): void {
        if(email === null)throw new InternalServerErrorException (`${__dirname} : email값이 존재하지 않습니다.`);
        this.email = email;
    }

    private setUserProfile(userProfile: string): void {
        if(userProfile === null)throw new InternalServerErrorException (`${__dirname} : userProfile값이 존재하지 않습니다.`);
        this.userProfile = userProfile;
    }

    private setAccountNumber(accountNumber: string | null): void {
        this.accountNumber = accountNumber;
    }

    private setBank(bank: string | null): void {
        this.bank = bank;
    }

    private setHiredate(hiredate: Date): void {
        if(hiredate === null)throw new InternalServerErrorException (`${__dirname} : hiredate값이 존재하지 않습니다.`);
        this.hiredate = hiredate;
    }

    private setCompany(company: string): void {
        if(company === null)throw new InternalServerErrorException (`${__dirname} : company값이 존재하지 않습니다.`);
        this.company = company;
    }

    private setJob(job: string): void {
        if(job === null)throw new InternalServerErrorException (`${__dirname} : job 값이 존재하지 않습니다.`);
        this.job = job;
    }

    private setJobIntroduce(jobIntroduce: string): void {
        if(jobIntroduce === null)throw new InternalServerErrorException (`${__dirname} : jobIntroduce 값이 존재하지 않습니다.`);
        this.jobIntroduce = jobIntroduce;
    }




}