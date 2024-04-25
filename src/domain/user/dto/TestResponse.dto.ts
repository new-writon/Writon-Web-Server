
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { InternalServerErrorException } from '@nestjs/common';




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export class TestResponseDto {

    private nickname: string;

    private gender: string;

    private phone:string;

    constructor(nickname:string, gender: string, phone:string){
        this.setNickname(nickname)
        this.setGender(gender)
        this.setPhone(phone)
    }

    public static of(nickname:string, gender: string, phone:string): TestResponseDto {

        return new TestResponseDto(nickname, gender, phone);
 
    }

    private setNickname(nickname:string): void{
        if(nickname === null) throw new InternalServerErrorException (`${__dirname} : nickname 값이 존재하지 않습니다.`);
        this.nickname=nickname
    }

    private setGender(gender:string): void{
        if(gender === null) throw new InternalServerErrorException (`${__dirname} : profileImage 값이 존재하지 않습니다.`);
        this.gender=gender
    }

    private setPhone(phone:string): void {
        if(phone === null) throw new InternalServerErrorException (`${__dirname} : phone 값이 존재하지 않습니다.`);
        this.phone=phone
    }
}