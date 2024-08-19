import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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