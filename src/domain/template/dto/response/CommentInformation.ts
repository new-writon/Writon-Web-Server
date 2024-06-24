import { InternalServerErrorException } from "@nestjs/common";

export class CommentInformation {
    private job: string;
    private company: string;
    private company_public: boolean;
    private profile: string;
    private comment_id: number;
    private nickname: string;
    private user_templete_id: number;
    private content: string;
    private created_at: Date;
    private myCommentSign: number;
    private comment_group: string;

    constructor(
        job: string,
        company: string,
        company_public: boolean,
        profile: string,
        comment_id: number,
        nickname: string,
        user_templete_id: number,
        content: string,
        created_at: Date,
        myCommentSign: number,
        comment_group: string
    ) {
        this.setJob(job);
        this.setCompany(company);
        this.setCompanyPublic(company_public);
        this.setProfile(profile);
        this.setCommentId(comment_id);
        this.setNickname(nickname);
        this.setUserTempleteId(user_templete_id);
        this.setContent(content);
        this.setCreatedAt(created_at);
        this.setMyCommentSign(myCommentSign);
        this.setCommentGroup(comment_group);
    }

    public static of(
        job: string,
        company: string,
        company_public: boolean,
        profile: string,
        comment_id: number,
        nickname: string,
        user_templete_id: number,
        content: string,
        created_at: Date,
        myCommentSign: number,
        comment_group: string
    ){
        return new CommentInformation(
            job, company, company_public, profile, 
            comment_id, nickname, user_templete_id, 
            content, created_at, myCommentSign, comment_group);
    }


    getJob(): string {
        return this.job;
    }

    private setJob(job: string): void {
        if (job === null) throw new InternalServerErrorException(`${__dirname} : job 값이 존재하지 않습니다.`);
        this.job = job;
    }


    getCompany(): string {
        return this.company;
    }

    private setCompany(company: string): void {
        if (company === null) throw new InternalServerErrorException(`${__dirname} : company 값이 존재하지 않습니다.`);
        this.company = company;
    }


    isCompanyPublic(): boolean {
        return this.company_public;
    }

    private setCompanyPublic(company_public: boolean): void {
        if (company_public === null) throw new InternalServerErrorException(`${__dirname} : company_public 값이 존재하지 않습니다.`);
        this.company_public = company_public;
    }


    getProfile(): string {
        return this.profile;
    }

    private setProfile(profile: string): void {
        this.profile = profile;
    }


    getCommentId(): number {
        return this.comment_id;
    }

    private setCommentId(comment_id: number): void {
        if (comment_id === null) throw new InternalServerErrorException(`${__dirname} : comment_id 값이 존재하지 않습니다.`);
        this.comment_id = comment_id;
    }

    getNickname(): string {
        return this.nickname;
    }

    private setNickname(nickname: string): void {
        if (nickname === null) throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        this.nickname = nickname;
    }


    getUserTempleteId(): number {
        return this.user_templete_id;
    }

    private setUserTempleteId(user_templete_id: number): void {
        if (user_templete_id === null) throw new InternalServerErrorException(`${__dirname} : user_templete_id 값이 존재하지 않습니다.`);
        this.user_templete_id = user_templete_id;
    }

    // Getter and Setter for content
    getContent(): string {
        return this.content;
    }

    private setContent(content: string): void {
        if (content === null) throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
        this.content = content;
    }


    getCreatedAt(): Date {
        return this.created_at;
    }

    private setCreatedAt(created_at: Date): void {
        if (created_at === null) throw new InternalServerErrorException(`${__dirname} : created_at 값이 존재하지 않습니다.`);
        this.created_at = created_at;
    }


    getMyCommentSign(): number {
        return this.myCommentSign;
    }

    private setMyCommentSign(myCommentSign: number): void {
        if (myCommentSign === null) throw new InternalServerErrorException(`${__dirname} : myCommentSign 값이 존재하지 않습니다.`);
        this.myCommentSign = myCommentSign;
    }


    getCommentGroup(): string {
        return this.comment_group;
    }

    private setCommentGroup(comment_group: string): void {
        if (comment_group === null) throw new InternalServerErrorException(`${__dirname} : comment_group 값이 존재하지 않습니다.`);
        this.comment_group = comment_group;
    }
}
