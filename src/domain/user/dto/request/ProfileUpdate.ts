import { IsNotEmpty } from "class-validator";


export class ProfileUpdate{

    @IsNotEmpty()
    private nickname:string

    @IsNotEmpty()
    private company:string;

    @IsNotEmpty()
    private hireDate:Date;

    @IsNotEmpty()
    private job:string;

    @IsNotEmpty()
    private jobIntroduce:string;

    @IsNotEmpty()
    private companyPublic:boolean;

    getNickname(){
        return this.nickname;
    }

    getCompany(){
        return this.company;
    }

    getHireDate(){
        return this.hireDate
    }

    getJob(){
        return this.job
    }

    getJobIntroduce(){
        return this.jobIntroduce;
    }

    getComanyPublic(){
        return this.companyPublic;
    }


}