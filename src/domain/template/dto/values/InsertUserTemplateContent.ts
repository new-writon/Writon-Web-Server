import { InternalServerErrorException } from "@nestjs/common";



export class InsertUserTemplateContent {

    private question_id: number;
    private content: string;
    private visibility: boolean;
    private user_templete_id: number;

    constructor(
        question_id: number,
        content: string,
        visibility: boolean,
        user_templete_id: number,
    ){
        this.setQuestionId(question_id);
        this.setContent(content);
        this.setVisibility(visibility);
        this.setUserTempleteId(user_templete_id);
    }

    public static of(
        question_id: number,
        content: string,
        visibility: boolean,
        user_templete_id: number,
    ){
        return new InsertUserTemplateContent(question_id,content,visibility,user_templete_id);
    }

    private setQuestionId(question_id: number): void {
        if (question_id === null) throw new InternalServerErrorException(`${__dirname} : question_id 값이 존재하지 않습니다.`);
        
        this.question_id = question_id;
    }

    private setContent(content: string): void {
        if (content === null) throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
        this.content = content;
    }

    private setVisibility(visibility: boolean): void {
        if (visibility === null) throw new InternalServerErrorException(`${__dirname} : visibility 값이 존재하지 않습니다.`);
        this.visibility = visibility;
    }

    private setUserTempleteId(user_templete_id: number): void {
        if (user_templete_id === null) throw new InternalServerErrorException(`${__dirname} : user_templete_id 값이 존재하지 않습니다.`);
        this.user_templete_id = user_templete_id;
    }

    public getQuestionId(){
        return this.question_id;
    }

    public getContent(){ 
        return this.content;
    }

    public getVisibility(){
        return this.visibility;
    }

    public getUserTempleteId() {
        return this.user_templete_id;
    }
}