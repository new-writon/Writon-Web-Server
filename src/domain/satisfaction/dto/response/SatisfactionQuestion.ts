import { InternalServerErrorException } from "@nestjs/common";
import { Satisfaction } from "../../domain/entity/Satisfaction.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SatisfactionQuestion{
    private satisfactionId: number;
    private type:string;
    private question:string;

    constructor(
        satisfactionId: number,
        type:string,
        question:string
    ){
        this.setSatisfactionId(satisfactionId);
        this.setType(type);
        this.setQuestion(question);
    }

    public static of(satisfaction:Satisfaction[]){
        return satisfaction.map((satisfaction)=>{
            return new SatisfactionQuestion(satisfaction.getId(), satisfaction.getType(), satisfaction.getQuestion())
        });
    }


    private setSatisfactionId(satisfaction_id:number){
        if(satisfaction_id === null)throw new InternalServerErrorException (`${__dirname} : satisfaction_id 값이 존재하지 않습니다.`);
        this.satisfactionId=satisfaction_id;
    }

    private setType(type:string){
        if(type === null)throw new InternalServerErrorException (`${__dirname} : type 값이 존재하지 않습니다.`);
        this.type=type;
    }

    private setQuestion(question:string){
        if(question === null)throw new InternalServerErrorException (`${__dirname} : question 값이 존재하지 않습니다.`);
        this.question=question;
    }
}