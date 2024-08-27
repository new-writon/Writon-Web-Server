import { IsNotEmpty } from "class-validator";


export class ProfileUpdate{

    @IsNotEmpty()
    private nickname:string

    @IsNotEmpty()
    private company:string;

    @IsNotEmpty()
    private hireDate:Date;

    @IsNotEmpty()
    private position:string;

    @IsNotEmpty()
    private positionIntroduce:string;

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

    getPosition(){
        return this.position
    }

    getPositionIntroduce(){
        return this.positionIntroduce;
    }

    getComanyPublic(){
        return this.companyPublic;
    }


}