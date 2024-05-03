import { IsNotEmpty } from "class-validator";


export class AuthenticationCodeRequest{

    @IsNotEmpty()
    private email: string;


    public getEmail(): string {
        return this.email;
    }

}