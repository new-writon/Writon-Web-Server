import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class SiginUp{

    
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    private identifier: string;


    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    private password: string;

    @IsNotEmpty()
    @IsEmail()
    private email: string;


    public geIdentifier(): string {
        return this.identifier;
    }

    public getPassword(): string {
        return this.password;
    }

    public getEmail(): string{
        return this.email;
    }
    
}