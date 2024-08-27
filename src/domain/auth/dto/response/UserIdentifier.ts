import { InternalServerErrorException } from "@nestjs/common";


export class UserIdentifier{

    private identifier: string

    constructor(identifier: string){
        this.setIdentifier(identifier);
     }

    public static of(idenfitier:string):UserIdentifier{
        return new UserIdentifier(idenfitier);
    }

    private setIdentifier(idenfitier: string){
        if(idenfitier=== null) throw new InternalServerErrorException (`${__dirname} : code 값이 존재하지 않습니다.`);
        this.identifier=idenfitier;
    }
}