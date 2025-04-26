import { Injectable } from '@nestjs/common';
import { checkData } from '../../../domain/auth/util/checker';
import { UserTemplate } from '../../../domain/template/domain/entity/UserTemplate';
import { TemplateException } from './TemplateException';
import { TemplateErrorCode } from './TemplateErrorCode';
import { Likes } from '../../../domain/template/domain/entity/Likes';
import { TemplateContent } from '../../../domain/template/dto/response/TemplateContent';
import { Comment } from 'src/domain/template/domain/entity/Comment';

@Injectable()
export class TemplateVerifyService {
  public verifyUserTemplates(userTemplates: UserTemplate[]) {
    if (!checkData(userTemplates[0])) {
      throw new TemplateException(TemplateErrorCode.NOT_FOUND_USERTEMPLATE);
    }
  }

  public verifyUserTemplate(userTemplate: UserTemplate) {
    if (!checkData(userTemplate)) {
      throw new TemplateException(TemplateErrorCode.NOT_FOUND_USERTEMPLATE);
    }
  }

  public verifyExistUserTemplate(userTemplate: UserTemplate) {
    if (checkData(userTemplate)) {
      throw new TemplateException(TemplateErrorCode.ALREADY_EXIST_USERTEMPLATE);
    }
  }

  public verifyComment(comment: Comment) {
    if (!checkData(comment)) {
      throw new TemplateException(TemplateErrorCode.NOT_FOUND_COMMENT);
    }
  }
  public verifyComments(comments: Comment[]) {
    if (!checkData(comments)) {
      throw new TemplateException(TemplateErrorCode.NOT_FOUND_COMMENT);
    }
  }

  public verifyLikes(likes: Likes[]) {
    if (!checkData(likes[0])) {
      throw new TemplateException(TemplateErrorCode.NOT_FOUND_LIKE);
    }
  }

  public verifyExistLike(like: Likes) {
    if (checkData(like)) {
      throw new TemplateException(TemplateErrorCode.ALREADY_EXIST_LIKE);
    }
  }

  public verifyTemplateContents(templateContents: TemplateContent[]) {
    if (!checkData(templateContents[0])) {
      throw new TemplateException(TemplateErrorCode.NOT_FOUND_TEMPLATE_CONTENT);
    }
  }

  public verifyQuestionId(status: boolean) {
    if (!status) {
      throw new TemplateException(TemplateErrorCode.NOT_FOUND_QUESTION);
    }
  }
}
