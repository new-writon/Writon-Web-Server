
import { IsNotEmpty } from "class-validator";


export class AffiliationStart {
    
    @IsNotEmpty()
    private organization: string;

    @IsNotEmpty()
    private nickname: string;

    @IsNotEmpty()
    private job: string;

    @IsNotEmpty()
    private jobIntroduce: string;

    @IsNotEmpty()
    private hireDate: Date;

    @IsNotEmpty()
    private company: string;

    @IsNotEmpty()
    private companyPublic: boolean;



    getOrganization() {
        return this.organization;
    }

    getNickname() {
        return this.nickname;
    }

    getJob() {
        return this.job;
    }

    getJobIntroduce() {
        return this.jobIntroduce;
    }

    getHireDate() {
        return this.hireDate;
    }

    getCompany() {
        return this.company;
    }

    getCompanyPublic() {
        return this.companyPublic;
    }
}