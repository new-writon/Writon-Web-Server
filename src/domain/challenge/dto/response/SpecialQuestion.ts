import { InternalServerErrorException } from "@nestjs/common";


export class SpecialQuestion{
    private question_id:number;
    private question: string;
    private category:string

    constructor(  
        question_id:number,
        question: string,
        category:string){
            this.setQuestionId(question_id);
            this.setQuestion(question);
            this.setCategory(category);
    }

    public static of(specialQuestion: SpecialQuestion[]): SpecialQuestion[] {
        return specialQuestion.map((sq) => {
            return new SpecialQuestion(sq.question_id, sq.question, sq.category);
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

    private setCategory(category: string){
        if(category === null)throw new InternalServerErrorException (`${__dirname} : category 값이 존재하지 않습니다.`);
        this.category=category
    }
    

}

