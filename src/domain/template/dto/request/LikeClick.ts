import { IsNotEmpty } from "class-validator";


export class LikeClick{
    
    @IsNotEmpty()
    private userTemplateId: number;

    @IsNotEmpty()
    private organization: string;

    public getUserTemplateId(){
        return this.userTemplateId;
    }

    public getOrganization(){
        return this.organization;
    }
}