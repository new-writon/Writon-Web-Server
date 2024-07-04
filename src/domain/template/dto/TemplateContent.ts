import { IsNotEmpty } from "class-validator";




export class WriteTemplateContent{

    @IsNotEmpty()
    private question_id: number;

    @IsNotEmpty()
    private content: string

    @IsNotEmpty()
    private visibility: boolean

    public getQuestionId(){
        return this.question_id;
    }

    public getContent(){
        return this.content;
    }

    public getVisibility(){
        return this.visibility;
    }

}