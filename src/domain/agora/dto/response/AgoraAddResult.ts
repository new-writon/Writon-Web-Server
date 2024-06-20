import { InternalServerErrorException } from "@nestjs/common";


export class AgoraAddResult{

    private status: boolean;

    constructor(status:boolean){
        this.setStatus(status);
    }

    public static of(status:boolean){
        return new AgoraAddResult(status);
    }


    private setStatus(status:boolean){
        if(status === null)throw new InternalServerErrorException (`${__dirname} : status 값이 존재하지 않습니다.`);
        this.status=status;
    }
}