



export class WriteTemplateContent{

    public question_id: number
    public content: string
    public visibility: boolean

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