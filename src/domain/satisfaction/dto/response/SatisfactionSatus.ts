import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SatisfactionStatus{

    private review:number;

    constructor(review:number){
        this.setReview(review);
    }

    public static of(review:number){
        return new SatisfactionStatus(review);
    }


    private setReview(review:number){
        if(review === null)throw new InternalServerErrorException (`${__dirname} : review값이 존재하지 않습니다.`);
        this.review=review;
    }
}