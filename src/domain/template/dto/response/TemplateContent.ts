import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class TemplateContent {
    private job: string;
    private nickname: string;
    private company: string;
    private companyPublic: boolean;
    private profile: string | null ; 
    private questionId: number;
    public userTemplateId: number;
    private questionContentId: number;
    private content: string;
    private createdAt: string;
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
        companyPublic: boolean,
        profile: string | null,
        questionId: number,
        userTempleteId: number,
        questionContentId: number,
        content: string,
        createdAt: string,
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
        this.setCompanyPublic(companyPublic);
        this.setProfile(profile);
        this.setQuestionId(questionId);
        this.setUserTempleteId(userTempleteId);
        this.setQuestionContentId(questionContentId);
        this.setContent(content);
        this.setCreatedAt(createdAt);
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
        companyPublic: boolean,
        profile: string | null,
        questionId: number,
        userTempleteId: number,
        questionContentId: number,
        content: string,
        createdAt: string,
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

        return new TemplateContent(job, nickname, company, companyPublic, profile,
            questionId, userTempleteId, questionContentId, content, createdAt,
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

    private setCompanyPublic(companyPublic: boolean): void {
        if (companyPublic === null) throw new InternalServerErrorException(`${__dirname} : companyPublic 값이 존재하지 않습니다.`);
        this.companyPublic = companyPublic;
    }

    private setProfile(profile: string | null): void {
        this.profile = profile;
    }

    private setQuestionId(questionId: number): void {
        if (questionId === null) throw new InternalServerErrorException(`${__dirname} : questionId 값이 존재하지 않습니다.`);
        this.questionId = questionId;
    }

    private setUserTempleteId(userTemplateId: number): void {
        if (userTemplateId === null) throw new InternalServerErrorException(`${__dirname} : userTemplateId값이 존재하지 않습니다.`);
        this.userTemplateId = userTemplateId;
    }

    private setQuestionContentId(questionContentId: number): void {
        if (questionContentId === null) throw new InternalServerErrorException(`${__dirname} : questionContentId 값이 존재하지 않습니다.`);
        this.questionContentId= questionContentId;
    }

    private setContent(content: string): void {
        if (content === null) throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
        this.content = content;
    }

    private setCreatedAt(createdAt: string): void {
        if (createdAt === null) throw new InternalServerErrorException(`${__dirname} : createdAt 값이 존재하지 않습니다.`);
        this.createdAt= createdAt;
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
        return this.companyPublic;
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


