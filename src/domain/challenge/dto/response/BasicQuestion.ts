import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class BasicQuestion{
    private question_id:number;
    private question: string;

    constructor(  
        question_id:number,
        question: string){
            this.setQuestionId(question_id);
            this.setQuestion(question);
    }

    public static of(specialQuestion: BasicQuestion[]): BasicQuestion[] {
        return specialQuestion.map((sq) => {
            return new BasicQuestion(sq.question_id, sq.question);
        });
    }

    private setQuestionId(questionId: number){
        if(questionId === null)throw new InternalServerErrorException (`${__dirname} : questionId값이 존재하지 않습니다.`);
        this.question_id=questionId
    }

    private setQuestion(question: string){
        if(question === null)throw new InternalServerErrorException (`${__dirname} : question값이 존재하지 않습니다.`);
        this.question=question
    }


}