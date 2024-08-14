import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SmallTalkResult {

    private status: boolean;

    constructor(status:boolean){
        this.setStatus(status);
    }

    public static of(status:boolean){
        return new SmallTalkResult(status);
    }


    private setStatus(status:boolean){
        if(status === null)throw new InternalServerErrorException (`${__dirname} : status 값이 존재하지 않습니다.`);
        this.status=status;
    }
}