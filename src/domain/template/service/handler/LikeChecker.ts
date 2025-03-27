import { Injectable } from '@nestjs/common';
import { TemplateHandler } from './TemplateHandler';
import { LikeCheck } from '../../dto/request/LikeCheck';
import { TemplateOperation } from '../types/Operation';
import { LikeHelper } from '../../helper/Like.Helper';

@Injectable()
export class LikeChecker implements TemplateHandler<LikeCheck, void> {
  operation: TemplateOperation = 'CHECK_LIKE';
  constructor(private readonly likeHelper: LikeHelper) {}
  async handle(likeCheck: LikeCheck) {
    console.log(likeCheck);
    await this.likeHelper.executeUpdateLikeCheck(likeCheck.getLikeId());
  }
}
