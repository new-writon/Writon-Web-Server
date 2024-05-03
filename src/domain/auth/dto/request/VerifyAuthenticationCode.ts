import { IsEmail, IsNotEmpty } from "class-validator";


export class VerifyAuthenticationCode{
    
    @IsNotEmpty()
    @IsEmail()
    private email: string;

    @IsNotEmpty()
    private code: string;

    public getEmail(){
        return this.email
    }

    public getCode(){
        return this.code
    }

}