import { InternalServerErrorException } from "@nestjs/common";

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
    private created_at: string;
    private visibility: boolean;
    private category: string;
    private question: string;
    private affiliationId:number;
    private likeCount: string; 
    private commentCount: string; 
    private myLikeSign: string;

    constructor(
        job: string,
        nickname: string,
        company: string,
        company_public: boolean,
        profile: string | null,
        question_id: number,
        user_templete_id: number,
        question_content_id: number,
        content: string,
        created_at: string,
        visibility: boolean,
        category: string,
        question: string,
        affiliationId:number,
        likeCount: string,
        commentCount: string,
        myLikeSign: string
    ) {
        this.setJob(job);
        this.setNickname(nickname);
        this.setCompany(company);
        this.setCompanyPublic(company_public);
        this.setProfile(profile);
        this.setQuestionId(question_id);
        this.setUserTempleteId(user_templete_id);
        this.setQuestionContentId(question_content_id);
        this.setContent(content);
        this.setCreatedAt(created_at);
        this.setVisibility(visibility);
        this.setCategory(category);
        this.setQuestion(question);
        this.setAffiliationId(affiliationId)
        this.setLikeCount(likeCount);
        this.setCommentCount(commentCount);
        this.setMyLikeSign(myLikeSign);
    }

    public static of(
        job: string,
        nickname: string,
        company: string,
        company_public: boolean,
        profile: string | null,
        question_id: number,
        user_templete_id: number,
        question_content_id: number,
        content: string,
        created_at: string,
        visibility: boolean,
        category: string,
        question: string,
        affiliationId:number,
        likeCount: string,
        commentCount: string,
        myLikeSign: string
    ){
        // return templateContents.map((data) => new TemplateContent(data.job, data.nickname, data.company, data.company_public, data.profile, data.question_id, data.user_templete_id,
        //     data.question_content_id, data.content, data.created_at, data.visibility, data.category, data.question, data.likeCount, data.commentCount, data.myLikeSign
        // ));
        
        // return new TemplateContent(templateContents.job, templateContents.nickname, templateContents.company, templateContents.company_public, templateContents.profile,
        //     templateContents.question_id, templateContents.user_templete_id, templateContents.question_content_id, templateContents.content, templateContents.created_at,
        //     templateContents.visibility, templateContents.category, templateContents.question, templateContents.likeCount, templateContents.commentCount, templateContents.myLikeSign
        // )

        return new TemplateContent(job, nickname, company, company_public, profile,
            question_id, user_templete_id, question_content_id, content, created_at,
            visibility, category, question, affiliationId, likeCount, commentCount, myLikeSign
        )
    }

    private setJob(job: string): void {
        if (job === null) throw new InternalServerErrorException(`${__dirname} : job 값이 존재하지 않습니다.`);
        this.job = job;
    }

    private setNickname(nickname: string): void {
        if (nickname === null) throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        this.nickname = nickname;
    }

    private setCompany(company: string): void {
        if (company === null) throw new InternalServerErrorException(`${__dirname} : company 값이 존재하지 않습니다.`);
        this.company = company;
    }

    private setCompanyPublic(company_public: boolean): void {
        if (company_public === null) throw new InternalServerErrorException(`${__dirname} : company_public 값이 존재하지 않습니다.`);
        this.company_public = company_public;
    }

    private setProfile(profile: string | null): void {
        this.profile = profile;
    }

    private setQuestionId(question_id: number): void {
        if (question_id === null) throw new InternalServerErrorException(`${__dirname} : question_id 값이 존재하지 않습니다.`);
        this.question_id = question_id;
    }

    private setUserTempleteId(user_templete_id: number): void {
        if (user_templete_id === null) throw new InternalServerErrorException(`${__dirname} : user_templete_id 값이 존재하지 않습니다.`);
        this.user_templete_id = user_templete_id;
    }

    private setQuestionContentId(question_content_id: number): void {
        if (question_content_id === null) throw new InternalServerErrorException(`${__dirname} : question_content_id 값이 존재하지 않습니다.`);
        this.question_content_id = question_content_id;
    }

    private setContent(content: string): void {
        if (content === null) throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
        this.content = content;
    }

    private setCreatedAt(created_at: string): void {
        if (created_at === null) throw new InternalServerErrorException(`${__dirname} : created_at 값이 존재하지 않습니다.`);
        this.created_at = created_at;
    }

    private setVisibility(visibility: boolean): void {
        if (visibility === null) throw new InternalServerErrorException(`${__dirname} : visibility 값이 존재하지 않습니다.`);
        this.visibility = visibility;
    }

    private setCategory(category: string): void {
        if (category === null) throw new InternalServerErrorException(`${__dirname} : category 값이 존재하지 않습니다.`);
        this.category = category;
    }

    private setQuestion(question: string): void {
        if (question === null) throw new InternalServerErrorException(`${__dirname} : question 값이 존재하지 않습니다.`);
        this.question = question;
    }

    private setLikeCount(likeCount: string): void {
        if (likeCount === null) throw new InternalServerErrorException(`${__dirname} : likeCount 값이 존재하지 않습니다.`);
        this.likeCount = likeCount;
    }

    private setCommentCount(commentCount: string): void {
        if (commentCount === null) throw new InternalServerErrorException(`${__dirname} : commentCount 값이 존재하지 않습니다.`);
        this.commentCount = commentCount;
    }

    private setMyLikeSign(myLikeSign: string): void {
        if (myLikeSign === null) throw new InternalServerErrorException(`${__dirname} : myLikeSign 값이 존재하지 않습니다.`);
        this.myLikeSign = myLikeSign;
    }

    private setAffiliationId(affiliationId:number){
        if (affiliationId === null) throw new InternalServerErrorException(`${__dirname} : affiliationId 값이 존재하지 않습니다.`);
        this.affiliationId = affiliationId;
    }

    public getCompanyPublic(){
        return this.company_public;
    }

    public changeCompany(company:string | null){
        return this.company =company;
    }
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


