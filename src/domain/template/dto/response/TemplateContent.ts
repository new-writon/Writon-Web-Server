
export class TemplateContent {
    private job: string;
    private nickname: string;
    private company: string;
    private company_public: boolean;
    private profile: string | null ; 
    private question_id: number;
    public user_templete_id: number;
    private question_content_id: number;
    private content: string;
    private created_at: Date;
    private visibility: boolean;
    private category: string;
    private question: string;
    private likeCount: string; 
    private commentCount: string; 
    private myLikeSign: string;
}



export class TemplateContentArray {
    templateContentArray: TemplateContent[][];

    constructor(templateContentArray: TemplateContent[][]) {
        this.templateContentArray = templateContentArray;
    }

    public static of(templateContentArray: TemplateContent[][]){
        return new TemplateContentArray(templateContentArray);
    }
}


