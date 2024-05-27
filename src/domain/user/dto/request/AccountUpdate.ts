import { IsNotEmpty } from "class-validator";


export class AccountUpdate{
    
    @IsNotEmpty()
    private accountNumber: string;

    @IsNotEmpty()
    private bank: string;

    public getAccountNumber():string{
        return this.accountNumber;
    }

    public getBank():string{
        return this.bank;
    }
}