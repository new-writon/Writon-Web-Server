import { InternalServerErrorException } from '@nestjs/common';

export class MyComment {
  private commentId: number;
  private commentCreateAt: Date;
  private content: string;
  private userTemplateFinishedAt: Date;
  private writorNickname: string;
  private userTemplateId: number;

  constructor(
    commentId: number,
    commentCreateAt: Date,
    content: string,
    userTemplateFinishedAt: Date,
    writorNickname: string,
    userTemplateId: number,
  ) {
    this.setCommentId(commentId);
    this.setCommentCreateAt(commentCreateAt);
    this.setContent(content);
    this.setUserTemplateFinishedAt(userTemplateFinishedAt);
    this.setWritorNickname(writorNickname);
    this.setUserTemplateId(userTemplateId);
  }

  public static of(myComment: MyComment[]) {
    return myComment.map((comment) => {
      return new MyComment(
        comment.commentId,
        comment.commentCreateAt,
        comment.content,
        comment.userTemplateFinishedAt,
        comment.writorNickname,
        comment.userTemplateId,
      );
    });
  }

  setCommentId(commentId: number): void {
    if (commentId === null) {
      throw new InternalServerErrorException(`${__dirname} : commentId 값이 존재하지 않습니다.`);
    }
    this.commentId = commentId;
  }

  setCommentCreateAt(commentCreateAt: Date): void {
    if (commentCreateAt === null) {
      throw new InternalServerErrorException(
        `${__dirname} : commentCreateAt 값이 존재하지 않습니다.`,
      );
    }
    this.commentCreateAt = commentCreateAt;
  }

  setContent(content: string): void {
    if (content === null) {
      throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
    }
    this.content = content;
  }

  setUserTemplateFinishedAt(userTemplateFinishedAt: Date): void {
    if (userTemplateFinishedAt === null) {
      throw new InternalServerErrorException(
        `${__dirname} : userTemplateFinishedAt 값이 존재하지 않습니다.`,
      );
    }
    this.userTemplateFinishedAt = userTemplateFinishedAt;
  }

  setWritorNickname(writorNickname: string): void {
    if (writorNickname === null) {
      throw new InternalServerErrorException(
        `${__dirname} : writorNickname 값이 존재하지 않습니다.`,
      );
    }
    this.writorNickname = writorNickname;
  }

  setUserTemplateId(userTemplateId: number): void {
    if (userTemplateId === null) {
      throw new InternalServerErrorException(
        `${__dirname} : userTemplateId 값이 존재하지 않습니다.`,
      );
    }
    this.userTemplateId = userTemplateId;
  }
}
