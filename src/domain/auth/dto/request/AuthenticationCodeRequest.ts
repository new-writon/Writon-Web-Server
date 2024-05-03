import { IsEmail, IsNotEmpty } from "class-validator";


export class AuthenticationCodeRequest{

    @IsNotEmpty()
    @IsEmail()
    private email: string;


    public getEmail(): string {
        return this.email;
    }

}