import { InternalServerErrorException } from '@nestjs/common';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { Comment } from '../../domain/entity/Comment';

export class CommentInformation {
  private position: string;
  private company: string;
  private companyPublic: boolean;
  private nickname: string;
  private profile: string;
  private commentId: number;
  private userTemplateId: number;
  private content: string;
  private commentGroup: string;
  private createdAt: string;
  private myCommentSign: number;

  constructor(
    position: string,
    company: string,
    companyPublic: boolean,
    profile: string,
    commentId: number,
    nickname: string,
    userTemplateId: number,
    content: string,
    createdAt: string,
    myCommentSign: number,
    commentGroup: string,
  ) {
    this.setPosition(position);
    this.setCompany(company);
    this.setCompanyPublic(companyPublic);
    this.setProfile(profile);
    this.setCommentId(commentId);
    this.setNickname(nickname);
    this.setUserTempleteId(userTemplateId);
    this.setContent(content);
    this.setCreatedAt(createdAt);
    this.setMyCommentSign(myCommentSign);
    this.setCommentGroup(commentGroup);
  }

  public static of(
    affiliationData: Affiliation,
    commentData: Comment,
    createdAt: string,
    myCommentSign: number,
  ) {
    return new CommentInformation(
      affiliationData.getPosition(),
      affiliationData.getCompany(),
      affiliationData.getCompanyPublic(),
      affiliationData.getUser().getProfileImage(),
      commentData.getId(),
      affiliationData.getNickname(),
      commentData.getUserTemplateId(),
      commentData.getContent(),
      createdAt,
      myCommentSign,
      String(commentData.getCommentGroup()),
    );
  }

  getPosition(): string {
    return this.position;
  }

  private setPosition(position: string): void {
    if (position === null)
      throw new InternalServerErrorException(
        `${__dirname} : position 값이 존재하지 않습니다.`,
      );
    this.position = position;
  }

  getCompany(): string {
    return this.company;
  }

  private setCompany(company: string): void {
    if (company === null)
      throw new InternalServerErrorException(
        `${__dirname} : company 값이 존재하지 않습니다.`,
      );
    this.company = company;
  }

  isCompanyPublic(): boolean {
    return this.companyPublic;
  }

  private setCompanyPublic(companyPublic: boolean): void {
    if (companyPublic === null)
      throw new InternalServerErrorException(
        `${__dirname} : companyPublic 값이 존재하지 않습니다.`,
      );
    this.companyPublic = companyPublic;
  }

  getProfile(): string {
    return this.profile;
  }

  private setProfile(profile: string): void {
    this.profile = profile;
  }

  getCommentId(): number {
    return this.commentId;
  }

  private setCommentId(commentId: number): void {
    if (commentId === null)
      throw new InternalServerErrorException(
        `${__dirname} : commentId 값이 존재하지 않습니다.`,
      );
    this.commentId = commentId;
  }

  getNickname(): string {
    return this.nickname;
  }

  private setNickname(nickname: string): void {
    if (nickname === null)
      throw new InternalServerErrorException(
        `${__dirname} : nickname 값이 존재하지 않습니다.`,
      );
    this.nickname = nickname;
  }

  getUserTempleteId(): number {
    return this.userTemplateId;
  }

  private setUserTempleteId(userTemplateId: number): void {
    if (userTemplateId === null)
      throw new InternalServerErrorException(
        `${__dirname} : userTemplateId 값이 존재하지 않습니다.`,
      );
    this.userTemplateId = userTemplateId;
  }

  // Getter and Setter for content
  getContent(): string {
    return this.content;
  }

  private setContent(content: string): void {
    if (content === null)
      throw new InternalServerErrorException(
        `${__dirname} : content 값이 존재하지 않습니다.`,
      );
    this.content = content;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  private setCreatedAt(createdAt: string): void {
    if (createdAt === null)
      throw new InternalServerErrorException(
        `${__dirname} : createdAt 값이 존재하지 않습니다.`,
      );
    this.createdAt = createdAt;
  }

  getMyCommentSign(): number {
    return this.myCommentSign;
  }

  private setMyCommentSign(myCommentSign: number): void {
    if (myCommentSign === null)
      throw new InternalServerErrorException(
        `${__dirname} : myCommentSign 값이 존재하지 않습니다.`,
      );
    this.myCommentSign = myCommentSign;
  }

  getCommentGroup(): string {
    return this.commentGroup;
  }

  private setCommentGroup(commentGroup: string): void {
    if (commentGroup === null)
      throw new InternalServerErrorException(
        `${__dirname} : commentGroup 값이 존재하지 않습니다.`,
      );
    this.commentGroup = commentGroup;
  }

  getCompanyPublic() {
    return this.companyPublic;
  }

  changeCompany(company: string | null) {
    this.company = company;
  }
}
